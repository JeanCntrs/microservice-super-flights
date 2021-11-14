import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { identity, Observable } from 'rxjs';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client.proxy';
import { UserDTO } from './dto/uset.dto';

@Controller('api/v2/users')
export class UserController {
    constructor(private readonly clientProxy: ClientProxySuperFlights) { }
    private _clientProxyUser = this.clientProxy.clientProxyUsers();

    @Post()
    create(@Body() userDTO: UserDTO): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.CREATE, userDTO)
    }

    @Get()
    findAll(): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() UserDTO: UserDTO): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.UPDATE, { id, UserDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyUser.send(UserMSG.DELETE, id);
    }
}
