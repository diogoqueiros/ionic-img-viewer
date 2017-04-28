var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { DomController, NavController, NavParams, Ion, GestureController, Config, Platform } from 'ionic-angular';
import { ElementRef, Renderer, Component, NgZone, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageViewerTransitionGesture } from './image-viewer-transition-gesture';
import { ImageViewerZoomGesture } from './image-viewer-zoom-gesture';
export var ImageViewerComponent = (function (_super) {
    __extends(ImageViewerComponent, _super);
    function ImageViewerComponent(_gestureCtrl, elementRef, _nav, _zone, renderer, domCtrl, platform, _navParams, _config, _sanitizer) {
        _super.call(this, _config, elementRef, renderer);
        this._gestureCtrl = _gestureCtrl;
        this.elementRef = elementRef;
        this._nav = _nav;
        this._zone = _zone;
        this.renderer = renderer;
        this.domCtrl = domCtrl;
        this.platform = platform;
        var url = _navParams.get('image');
        this.imageUrl = _sanitizer.bypassSecurityTrustUrl(url);
    }
    ImageViewerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var gestureCallBack = function () { return _this._nav.pop(); };
        this._zone.runOutsideAngular(function () { return _this.dragGesture = new ImageViewerTransitionGesture(_this.platform, _this, _this.domCtrl, _this.renderer, gestureCallBack); });
    };
    ImageViewerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // imageContainer is set after the view has been initialized
        this._zone.runOutsideAngular(function () { return _this.pinchGesture = new ImageViewerZoomGesture(_this, _this.imageContainer, _this.platform, _this.renderer); });
    };
    ImageViewerComponent.prototype.ngOnDestroy = function () {
        this.dragGesture && this.dragGesture.destroy();
        this.pinchGesture && this.pinchGesture.destroy();
    };
    ImageViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'image-viewer',
                    template: "\n\t\t<ion-header>\n\t\t\t<ion-navbar>\n\t\t\t</ion-navbar>\n\t\t</ion-header>\n\n\t\t<ion-backdrop></ion-backdrop>\n\n\t\t<div class=\"image-wrapper\">\n\t\t\t<div class=\"image\" #imageContainer>\n\t\t\t\t<img [src]=\"imageUrl\" tappable />\n\t\t\t</div>\n\t\t</div>\n\t"
                },] },
    ];
    /** @nocollapse */
    ImageViewerComponent.ctorParameters = function () { return [
        { type: GestureController, },
        { type: ElementRef, },
        { type: NavController, },
        { type: NgZone, },
        { type: Renderer, },
        { type: DomController, },
        { type: Platform, },
        { type: NavParams, },
        { type: Config, },
        { type: DomSanitizer, },
    ]; };
    ImageViewerComponent.propDecorators = {
        'imageContainer': [{ type: ViewChild, args: ['imageContainer',] },],
    };
    return ImageViewerComponent;
}(Ion));
//# sourceMappingURL=image-viewer.component.js.map