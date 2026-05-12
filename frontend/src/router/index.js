import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("@/pages/LandingPage.vue"),
  },
  {
    path: "/analyze",
    name: "Analyze",
    component: () => import("@/pages/AnalysisPage.vue"),
  },
  {
    path: "/result/:id",
    name: "Result",
    component: () => import("@/pages/ResultPage.vue"),
  },
  {
    path: "/history",
    name: "History",
    component: () => import("@/pages/HistoryPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
