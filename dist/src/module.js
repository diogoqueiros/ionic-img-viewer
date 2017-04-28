import { NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Config } from 'ionic-angular/config/config';
import { ImageViewerDirective } from './image-viewer.directive';
import { ImageViewerComponent } from './image-viewer.component';
import { registerCustomTransitions } from './image-viewer-transitions';
export var IonicImageViewerModule = (function () {
    function IonicImageViewerModule() {
    }
    IonicImageViewerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [IonicModule],
                    declarations: [
                        ImageViewerComponent,
                        ImageViewerDirective
                    ],
                    exports: [ImageViewerDirective],
                    entryComponents: [ImageViewerComponent],
                    providers: [
                        { provide: APP_INITIALIZER, useFactory: registerCustomTransitions, deps: [Config], multi: true }
                    ]
                },] },
    ];
    /** @nocollapse */
    IonicImageViewerModule.ctorParameters = function () { return []; };
    return IonicImageViewerModule;
}());
//# sourceMappingURL=module.js.map