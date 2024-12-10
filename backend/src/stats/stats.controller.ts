import { Controller, Get, HttpStatus, Inject, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import { Query } from "src/typeorm/query/query.entity";
import { Repository } from "typeorm";

@Controller("api/stats")
export class StatsController {

    constructor(
        @Inject(`QUERY`) private readonly query: Repository<Query>,
    ) { }

    @UseGuards(AuthGuard)
    @Get("requests")
    async findTotalRequestsNumber(
        @Res() res: Response,
    ) {
        try {
            const data = await this.query.count();
            return res.status(HttpStatus.OK).json({ count: data });
        } catch (err) {
            console.error(`Failed to read database.`);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard)
    @Get("top/cities")
    async findTopFiveCities(
        @Res() res: Response,
    ) {
        try {
            const topCities = await this.query
                .createQueryBuilder("query")
                .select("query.city", "city")
                .addSelect("COUNT(query.id)", "queryCount")
                .groupBy("query.city")
                .orderBy("queryCount", "DESC")
                .limit(5)
                .getRawMany();

            res.status(HttpStatus.OK).json(topCities);
        } catch (err) {
            console.error(`Failed to read database.`);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard)
    @Get("latest/requests")
    async findLastTenRequests(
        @Res() res: Response,
    ) {
        try {
            const queries = await this.query.find({
                order: { id: `DESC` },
                take: 10,
                relations: [`assignedWeather`],
            })

            res.status(HttpStatus.OK).json(queries);
        } catch (err) {
            console.error(`Failed to read database. Error: ${err}`);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}