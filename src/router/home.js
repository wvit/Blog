import Index from '../views/index'
import Find from '../views/find'
import My from '../views/my'

const homeRoute = [{
        path: '/index',
        component: Index,
    },
    {
        path: '/find',
        component: Find,
    },
    {
        path: '/my',
        component: My,
    },
]

export default homeRoute