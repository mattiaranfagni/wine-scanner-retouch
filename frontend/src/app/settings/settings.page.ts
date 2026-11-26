import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(public theme: ThemeService) {}

  onDarkModeChange(event: any) {
    this.theme.set(event.detail.checked);
  }
}
