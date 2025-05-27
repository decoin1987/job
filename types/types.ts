import {statuses} from './enums'

export type CVType = {
    id: number,
    name: string,
    description: string,
    date: string,
    status: statuses,
    portfolios: string,
    town: string,
    phone: string,
    age: number,
    birth_date: string,
    email: string,
    listing_id: number,
    photo: string,
}