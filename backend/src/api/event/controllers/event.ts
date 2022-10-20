/**
 * event controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
  async my(ctx) {
    const user = ctx.state.user
    if (!user) return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was provided!' }] }])
    const data = await strapi.entityService.findMany('api::event.event', {
      filters: { user: user.id },
      populate: { image: true }
    })
    if (!data || !data.length) return ctx.notFound()
    const sanitizedEntity = await this.sanitizeOutput(data, ctx)
    return this.transformResponse(sanitizedEntity, {})
  },
  async create(ctx) {
    const { id } = ctx.state.user //ctx.state.user contains the current authenticated user
    const response = await super.create(ctx)
    return await strapi.entityService
      .update('api::event.event', response.data.id, { data: { user: id } })
  },
  async update(ctx) {
    const { id } = ctx.state.user
    const [event] = await strapi.entityService
      .findMany('api::event.event', {
        filters: {
          id: ctx.request.params.id,
          user: id
        }
      })
    if (event) {
      return await super.update(ctx)
    } else {
      return ctx.unauthorized()
    }
  },
  async delete(ctx) {
    const { id } = ctx.state.user
    const [event] = await strapi.entityService
      .findMany('api::event.event', {
        filters: {
          id: ctx.request.params.id,
          user: id
        }
      })
    if (event) {
      return await super.delete(ctx)
    } else {
      return ctx.unauthorized()
    }
  }
}))
