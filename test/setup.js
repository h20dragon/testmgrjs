import {jsdom} from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

// Stubbed for react-input-mask
document.selection = {
    createRange: () => {
        return {
            parentElement: () => {}
        };
    }
};
