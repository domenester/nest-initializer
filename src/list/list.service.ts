import { Injectable } from '@nestjs/common'
import { ListFilter } from '../dtos'
import { ObjectLiteral, Like, Between } from 'typeorm'

export interface BuildListFilter extends ListFilter {
  fields: string []
}

@Injectable()
export class ListService {

  buildFilter(filter: BuildListFilter): ObjectLiteral {
    if (!filter) return {}
    const { search, range } = filter
    let where = []
    if (search) {
      filter.fields.forEach( field => where.push({ [field] : Like(`%${filter.search}%`) }))
      if (range && range.from && range.to) {
        const field = range.field || 'createdAt'
        where = where.map( w => ({ ...w, [field]: Between(range.from, range.to)}))
      }
      return { where }
    }
    if (range && range.from && range.to) {
      const field = range.field || 'createdAt'
      where.push({ [field]: Between(range.from, range.to)})
      return { where }
    }
  }
}
