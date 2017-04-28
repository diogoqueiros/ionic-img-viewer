import {
  DomController,
  NavController,
  NavParams,
  Ion,
  GestureController,
  Config,
  Platform
} from 'ionic-angular';
import { ElementRef, Renderer, Component, OnInit, OnDestroy, AfterViewInit, NgZone, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ImageViewerTransitionGesture } from './image-viewer-transition-gesture';
import { ImageViewerZoomGesture } from './image-viewer-zoom-gesture';

@Component({
    selector: 'image-viewer',
    template: `		
      <ion-header>
        <ion-toolbar no-lines>
          <ion-buttons left>
            <button ion-button (click)="dismiss($event)" icon-only>
              <ion-icon name="close"></ion-icon>
            </button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-backdrop></ion-backdrop>
  
      <div class="image-wrapper">
        <div class="image" #imageContainer>
          <img [src]="imageUrl" tappable />
        </div>
      </div>
	`
})
export class ImageViewerComponent extends Ion implements OnInit, OnDestroy, AfterViewInit {
    public imageUrl: SafeUrl;

    public dragGesture: ImageViewerTransitionGesture;

    @ViewChild('imageContainer') imageContainer;
    private pinchGesture: ImageViewerZoomGesture;

    public isZoomed: boolean;

    constructor(public _gestureCtrl: GestureController,
                public elementRef: ElementRef,
                private _nav: NavController,
                private _zone: NgZone,
                private renderer: Renderer,
                private domCtrl: DomController,
                private platform: Platform,
                _navParams: NavParams,
                _config: Config,
                _sanitizer: DomSanitizer) {
        super(_config, elementRef, renderer);

        const url = _navParams.get('image');
        this.imageUrl = _sanitizer.bypassSecurityTrustUrl(url);
    }

    ngOnInit() {
        let gestureCallBack = () => this._nav.pop();
        this._zone.runOutsideAngular(() => this.dragGesture = new ImageViewerTransitionGesture(this.platform, this, this.domCtrl, this.renderer, gestureCallBack));
    }

    ngAfterViewInit() {
        // imageContainer is set after the view has been initialized
        this._zone.runOutsideAngular(() => this.pinchGesture = new ImageViewerZoomGesture(this, this.imageContainer, this.platform, this.renderer));
    }

    ngOnDestroy() {
        this.dragGesture && this.dragGesture.destroy();
        this.pinchGesture && this.pinchGesture.destroy();
    }

    dismiss(event: any): void {
      event.preventDefault();
      this._nav.pop();
    }
}
