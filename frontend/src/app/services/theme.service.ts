import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private static readonly STORAGE_KEY = 'wine-scanner-dark-mode';
  private readonly systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  dark = false;

  // Applies the saved preference (or the system one) as soon as the app starts,
  // and keeps following the system theme until the user picks one explicitly.
  init() {
    const saved = localStorage.getItem(ThemeService.STORAGE_KEY);
    this.setDark(saved === null ? this.systemDark.matches : saved === 'true');

    const onSystemChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(ThemeService.STORAGE_KEY) === null) {
        this.setDark(event.matches);
      }
    };
    if (this.systemDark.addEventListener) {
      this.systemDark.addEventListener('change', onSystemChange);
    } else {
      this.systemDark.addListener(onSystemChange);
    }
  }

  set(dark: boolean) {
    localStorage.setItem(ThemeService.STORAGE_KEY, String(dark));
    this.setDark(dark);
  }

  private setDark(dark: boolean) {
    this.dark = dark;
    document.body.classList.toggle('dark', dark);
  }
}
