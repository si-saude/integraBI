import { IModal } from './imodal';

export class Modal implements IModal {

    private isShowed = false;

    constructor(private component, private confirmMethod: string) {

    }

    open() {
        this.isShowed = true;
    }

    modalIsShowed(): boolean {
        return this.isShowed;
    }

    closeModal() {
        this.isShowed = false;
    }

    confirmModal() {
        if (this.component[this.confirmMethod]()) {
            this.closeModal();
        }
    }
}
