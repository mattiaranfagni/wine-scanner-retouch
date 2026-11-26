import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-wineresult',
  templateUrl: './wineresult.page.html',
  styleUrls: ['./wineresult.page.scss'],
})

export class WineresultPage implements OnInit {
  @Input() data: any;
  favourite: Boolean;

  constructor(public storage: StorageService, public modalController:ModalController, public navParams: NavParams, public alertController: AlertController) {

   }

  ngOnInit() {
    this.data = this.navParams.get('data');
    console.log(this.navParams.get('data'));
    if(this.storage.getItem(this.data.year) != null) {
      this.favourite = true;
    }
    else
      this.favourite = false;
  }

  public dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  } 

  public info() {
    let info = '<div class="container"><p>The quality of a wine, its longevity and its characteristics can vary, even significantly, from one vintage to another. '+
    "In this regard, the weather during the growing season (April–September) is essential.</p>"+
    "<h2>Why is humidity important in determining wine quality?</h2>"+
    "<p> The climate affects the vine and its development during the vegetative phase, which usually runs from mid-April to mid-September."+
    " It is useful to measure the soil humidity of the vineyard, since the spring rains help the roots accumulate water. "+
    "This allows the plant to develop well in the first phase of vegetation. Later, in the summer months, the plant gradually slows down, since the soil tends to lose its water reserves because of the relatively scarce rainfall. </p>"+
    "<h2>Why is wind speed important in determining wine quality?</h2>"+
    "<p> The effect of wind varies with its intensity and its origin. Cool, gentle winds in the hottest periods can relieve excessive heat."+
    " Hot winds in the hottest periods can worsen any heat stress on the plant. "+
    " In general, breezes are favourable because they limit the activity of some parasites and regulate the humidity of the air, "+
    "preventing dangerous mould during the flowering period. </p> </div>";
    this.showAlert(info);
  } 

  addFavourite(year: string, data: any) {
    this.storage.addItem(year,data);
    this.favourite = true;
  }

  async showAlert(msg:any) {
    const alert = await this.alertController.create({
      cssClass: 'info-alert',
      header: 'FAQ',
      message: msg,
      buttons: ['Got it.']
    });
    alert.present();
  }
}
