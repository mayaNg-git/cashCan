export interface ReturnModel {
    province?: string,
    city?: string,
    street?: string,
    postalCode?: string,
    startDate?: Date | null,
    endDate?: Date | null,
    startTime?: string,
    endTime?: string,
    can?: number,
    beerBottle?: number,
    liquorBottle?: number,
    creditAmount?: number,
    isActive?: boolean
}