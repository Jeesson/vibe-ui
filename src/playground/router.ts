/**
 * router.ts
 * -----------------------------------------------------------------------------
 * Роутинг плейграунда на vue-router:
 *   /                        — обзор всех компонентов (OverviewPage.vue)
 *   /components/:slug        — страница одного компонента (ComponentPageView.vue)
 *   всё остальное            — редирект на /
 *
 * Конвертация legacy-ключей навигации ("overview" | "c-<key>", их эмитят
 * Sidebar и OverviewPage) в URL — pageKeyToPath() (см. ./pageKeyToPath.ts).
 * -----------------------------------------------------------------------------
 */
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "overview",
        component: () => import("./pages/OverviewPage.vue"),
    },
    {
        path: "/components/:slug",
        name: "component",
        component: () => import("./pages/ComponentPageView.vue"),
    },
    /* Legacy-пути старого самописного роутера (/basic, /form, ...) → на обзор. */
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        if (to.hash) {
            return { el: to.hash, top: 80, behavior: "smooth" };
        }
        return { top: 0 };
    },
});

export default router;
