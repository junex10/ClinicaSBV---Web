import * as moment from 'moment';

class Globals {
    isPdf = (file: string) => 
        file.substr(file.lastIndexOf('.') + 1) == 'pdf';

	isImage = (file: string) => {
		const formats = ['png','jpg','jpeg'];
		return formats.indexOf(file.substr(file.lastIndexOf('.') + 1)) != -1;
	}

    getDate = (format: string = 'DD/MM/YYYY', date: string | Date = new Date()) => 
        moment(date).format(format);

    uint8ToBase64 = (arr: any[]) => {
        let Uint8 = new Uint8Array(arr);
        return btoa(
            Uint8.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }
}
export default new Globals();