
export default class AbstractTest {

    constructor(opt) {
        if (typeof opt === 'string') {
            this.name = opt;
            this.id = null;
        }
        else {
            this.name = opt.name;
            this.id = opt.id;
        }
    }

}
