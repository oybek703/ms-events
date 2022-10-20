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
      populate: {user: true}
    })
    if (!data || !data.length) return ctx.notFound()
    const sanitizedEntity = await this.sanitizeOutput(data, ctx)
    return this.transformResponse(sanitizedEntity, {})
  }
}))
