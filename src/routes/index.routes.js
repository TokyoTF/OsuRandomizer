import controller from '../controllers/index.controller.js'
import { Router } from 'express'

const router = Router()

// Home
router.get('/', controller.renderIndex)

// Api General

router.get('/api/v1/randomMap',controller.PostRandomMap)

export default router
