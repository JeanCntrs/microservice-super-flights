import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FlightMSG } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client.proxy';
import { FlightDTO } from './dto/flight.dto';

@Controller('api/v2/flights')
export class FlightController {
    constructor(private readonly clientProxy: ClientProxySuperFlights) { }
    private _clientProxyFlight = this.clientProxy.clientProxyFlights();

    @Post()
    create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.CREATE, flightDTO);
    }

    @Get()
    findAll(): Observable<IFlight[]> {
        return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '');
    }
}
