import { Controller, Get } from "@nestjs/common";

@Controller("stats")
export class StatsController {

    constructor() { }

    @Get("top/requests")
    async findTotalRequestsNumber() {

    }

    @Get("top/cities")
    async findTopFiveCities() {

    }

    @Get("latest/requests")
    async findLastTenRequests() {

    }

}