import { SubscribeMessage, WebSocketGateway, WsResponse, ConnectedSocket, MessageBody } from '@nestjs/websockets'
import { Socket } from 'socket.io'

@WebSocketGateway(3002)
export class EventsGateway {

  private rooms: {
    [key: string]: {
      '1': Socket,
      '2'?: Socket,
    }
  } = {};

  @SubscribeMessage('ballOver')
  handleForceStop(
    @MessageBody() payload: any
  ): void {
    const { roomId, to } = payload
    const clientToEmit = this.rooms[roomId][to]
    clientToEmit.emit('ballOver')
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any
  ): void {
    const { roomId } = payload
    client.join(roomId)
    this.rooms[roomId] = this.rooms[roomId] && { ...this.rooms[roomId], '2': client }
    this.rooms[roomId]['1'].emit('startGame')
    this.rooms[roomId]['2'].emit('startGame')
  }

  @SubscribeMessage('stickMoved')
  handleMessage(@MessageBody() payload: any): void {
    const { room, to, y } = payload
    const clientById: Socket = this.rooms[room] && this.rooms[room][to]
    clientById && clientById.emit('moveStick', { y })
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @ConnectedSocket() client: Socket,
  ): WsResponse {
    const { id } = client
    this.rooms[id] = { '1': client }
    client.join(id)
    return { event: 'roomCreated', data: id }
  }
}
