import { Router } from 'express';
const router = Router()

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(join(__dirname, '..', 'views', 'index.html')); //__dirname if this file express/views
}); 

export default router;