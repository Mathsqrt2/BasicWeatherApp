import { Controller, Get, HttpStatus, Inject, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { Query } from "src/typeorm/query/query.entity";
import { Weather } from "src/typeorm/weather/weather.entity";
import { Repository } from "typeorm";

@Controller("api/stats")
export class StatsController {

    constructor(
        @Inject(`QUERY`) private readonly query: Repository<Query>,
        @Inject(`WEATHER`) private readonly weather: Repository<Weather>,
    ) { }

    private findRelations = (model: Repository<Query | Weather>): string[] => {
        const metadata = model.manager.connection.getMetadata(model.target);
        return metadata.relations.map(relation => relation.propertyName);
    }

    @Get("top/requests")
    async findTotalRequestsNumber(
        @Res() res: Response,
    ) {
        try {
            res.status(HttpStatus.FOUND).json(await this.query.count());
        } catch (err) {
            console.error(`Failed to read database.`);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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

            res.status(HttpStatus.FOUND).json(topCities);
        } catch (err) {
            console.error(`Failed to read database.`);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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
            
            res.status(HttpStatus.FOUND).json(queries);
        } catch (err) {
            console.error(`Failed to read database. Error: ${err}`);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}