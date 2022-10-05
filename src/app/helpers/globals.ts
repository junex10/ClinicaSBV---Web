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
}
export default new Globals();