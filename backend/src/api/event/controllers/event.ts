/**
 * event controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::event.event', ({strapi}) => ({
  async my() {
    return {message: 'it is from core routes controller!'}
  }
}));
