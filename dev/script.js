import Choosely from '../src/index';

const selector1 = new Choosely('form .form-item.form-type-select select');
const selector2 = new Choosely('form .form-item.form-type-select select', {
    searchable: true,
    inheritAttributes: ['value', 'style'], // default false,
    enableArrowNavigation: true,
    on: {
        Init() {
            console.log('Init.');
        },
        Open() {
            console.log('Open.');
        },
        Close() {
            console.log('Close.');
        },
        Select() {
            console.log('Select.');
        }
    }
});
