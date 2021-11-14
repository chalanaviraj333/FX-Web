import { Injectable } from '@angular/core';
import { PhotoDetails } from '../interfaces/photo-details';
import { Storage } from '@capacitor/storage';
import { Directory, Filesystem } from '@capacitor/filesystem';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { LoadingController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { FibTrade } from '../interfaces/fib-trade';
import { Observable } from 'rxjs';
import { base64StringToBlob } from 'blob-util';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonUploadServiceService {

  public photos: PhotoDetails[] = [];
  public validentry: boolean = true;
  public uploadphotobutton: boolean = false;
  private PHOTO_STORAGE: string = 'photos';

  private photoID: string = '';

  constructor(private platform: Platform, public loadingController: LoadingController, private storage: AngularFireStorage, private http: HttpClient) { }

  // Delete picture when user in add item
  public async deletePicture(photo: PhotoDetails, position: number) {
    this.photos.splice(position, 1);
    this.validentry = true;
    this.uploadphotobutton = false;

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });

    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
  }

  // add photo to the gallery
  public async addNewToGallery() {
    this.photos = [];
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photoID = await this.readAsBase64(capturedPhoto);

    this.photos.unshift(savedImageFile);
    this.validentry = false;
    this.uploadphotobutton = true;
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  // save picture for user view
  private async savePicture(cameraPhoto: Photo) {
    const base64Data = await this.readAsBase64(cameraPhoto);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      };
    }
  }

  // Read the file into base64 format
  private async readAsBase64(cameraPhoto: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });

      return file.data;
    } else {
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

    async uploadNewTrade(newTrade: FibTrade) {
      let downloadURL: Observable<string>;
      let uploadlocation;
      let httpRequestText;

    // perform loading controller
    const loadingScreen = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading Photo',
      backdropDismiss: false,
    });
    await loadingScreen.present();

    // check trade is under which category
    if (newTrade.tradeType == 'fib-trade')
    {
      uploadlocation = 'images/fib-trades/';
      httpRequestText = 'https://fx-web-3d3df-default-rtdb.firebaseio.com/fib-trades.json';
    }

    // common data
    const contenttype = 'image/png';
    const b64Data = this.photoID.split(',').pop();
    const blob = base64StringToBlob(b64Data, contenttype);
    const filename = new Date().getTime() + '.png';
    const uploadTask = this.storage.upload(uploadlocation + filename, blob);
    const fileRef = this.storage.ref(uploadlocation + filename);


    uploadTask
      .snapshotChanges()
      .pipe(finalize(() => (downloadURL = fileRef.getDownloadURL())))
      .subscribe((response) => {
        if (response.state == 'success') {
          firebase
            .storage()
            .ref()
            .child(uploadlocation + filename)
            .getDownloadURL()
            .then((imageURL) => {
              loadingScreen.message = 'Uploading New Trade';

              this.http
                .post(
                  httpRequestText,
                  {
                    ...newTrade,
                    key: null, clicktoview: null,
                    image: imageURL,
                  }
                )
                .subscribe((resData) => {
                  setInterval(() => {
                    loadingScreen.dismiss();
                  }, 2000);
                  loadingScreen.message = 'Successfully Uploaded';
                  loadingScreen.spinner = null;
                  this.clearallphotos();
                });
            });
        }
      });
    }

    clearallphotos() {
      this.photos = [];
      this.uploadphotobutton = false;
      this.validentry = true;
    }
}
