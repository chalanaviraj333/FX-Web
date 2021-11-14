import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { FibTrade } from 'src/app/interfaces/fib-trade';
import { PhotoDetails } from 'src/app/interfaces/photo-details';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonUploadServiceService } from 'src/app/services/common-upload-service.service';

@Component({
  selector: 'app-add-new-fib-trade',
  templateUrl: './add-new-fib-trade.page.html',
  styleUrls: ['./add-new-fib-trade.page.scss'],
})
export class AddNewFibTradePage implements OnInit {

  public allCurrencyPairs: Array<string> = ['AUDCAD', 'AUDUSD', 'EURUSD', 'GBPUSD', 'USDCHF'];
  public filteredCurrencyPairs: Array<string> = [];
  public selectedCurrencyPair :string = '';

  constructor(public commonUploadService: CommonUploadServiceService, private actionSheetController: ActionSheetController, private toastController: ToastController, private commonHttpService: CommonHttpService) { }

  ngOnInit() {
  }

  _forexPairOnType(event) {
    const entervalue = event.target.value;
    this.performcurrenctPairSearch(entervalue);
  }

  onClick(currencyPair) {
    this.selectedCurrencyPair = currencyPair;
    this.filteredCurrencyPairs = [];
  }

  performcurrenctPairSearch(entervalue:string) {
    this.filteredCurrencyPairs = this.allCurrencyPairs;

    if (entervalue && entervalue.trim() != "")
    {
      this.filteredCurrencyPairs = this.filteredCurrencyPairs.filter((currentcurrencypair) => {
        let searchWord = currentcurrencypair;
        return searchWord.toLowerCase().indexOf(entervalue.toLowerCase()) > -1;
      });
    }
  }

  // perform photo alert sheet funtion
  public async showActionSheet(photo: PhotoDetails, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // this.photoService.deletePicture(photo, position);
          this.commonUploadService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }

  onSubmitNext(form: NgForm) {
    if (this.commonUploadService.validentry == true) {
      this.presentToastAddUpload();
      return;
    }

    const newTrade: FibTrade = {
      key: null,
      image: null,
      totalMomentumDuration: null,
      totalTradeDuration: null,
      // totalTime: form.value.totalTimeHours*60 + form.value.totalTimeMinutes,
      // totalTimeHrsVariable: form.value.totalTimeHours,
      // totalTimeMinVariable: form.value.totalTimeMinutes,
      // tradeTime: form.value.tradeTimeHours*60 + form.value.tradeTimeMinutes,
      // tradeTimeHrsVariable: form.value.tradeTimeHours,
      // tradeTimeMinsVariable: form.value.tradeTimeMinutes,
      highestCandle: form.value.highestCandleMovement,
      totalCandle: form.value.totalCandleMovement,
      result: form.value.resultinTrade,
      tradeType: 'fib-trade',
      tradeDirection: form.value.tradeDirection.toLowerCase(),
      comments: form.value.notes,
      news: form.value.news,
      gain: form.value.tradeGain,
      momentStartDateTime: form.value.momentStartDateTime,
      tradeStartDateTime: form.value.tradeStartDateTime,
      tradeFinishedDateTime: form.value.tradeFinishedDateTime,
      starttoZeroHit: form.value.starttoZeroHit,
      starttoZeroHitDuration: null,
      week: form.value.monthWeek,
      pair: form.value.forexPair,
      timeFrame: form.value.timeFrame,
      clicktoview: null,
    }
    this.commonUploadService.uploadNewTrade(newTrade);
  }

    // alert controller for empty photo
    async presentToastAddUpload() {
      const toast = await this.toastController.create({
        message: "Please add a Screenshot.",
        duration: 4000,
        position: "bottom",
        color: "dark",
      });
      toast.present();
    }

    onClickDatabaseChanges() {
      this.commonHttpService.databaseChanges();
    }
}
