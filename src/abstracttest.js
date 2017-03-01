
export default class AbstractTest {

    constructor(opt) {
        this.description = '';
        this.id = null;

        if (typeof opt === 'string') {
            this.name = opt;
        }
        else {
            this.name = opt.name;
            if (opt.hasOwnProperty('description')) {
                this.description = opt.description;
            }
            this.id = opt.id;
        }
    }

}
