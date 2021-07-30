import * as moment from 'moment';

export const dateFixer = (property) => {
    const date = new Date(property.lastService);
    let cutDate = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
    return cutDate
};

export const altDateFixer = (property) => {
    const date = new Date(property.lastService);
    let cutDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    return cutDate
};

export const momentDateFixer = (property) => {
    const date = new Date(property.lastService);
    const cutDate = moment(date).format("YYYY-MM-DD")
    return cutDate
};

export const transactionDateFixer = (transaction) => {
    const date = new Date(transaction.date);
    let transactionDate = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
    return transactionDate
};

export const momentTransDateFixer = (transaction) => {
    const date = new Date(transaction.date);
    const transactionDate = moment(date).format("YYYY-MM-DD")
    return transactionDate
};