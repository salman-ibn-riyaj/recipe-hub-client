import { protectedFetch, serverFetch } from '@/lib/action/core/serverFetch';
import { getReports } from '@/lib/action/getReports';
import { getUsers } from '@/lib/action/getUsers';
import React from 'react';
import { Users, Crown, Utensils, AlertTriangle, Users2 } from 'lucide-react';

const AdminDashboard = async () => {
    const data = await getUsers();
      const users = data.users;
       const recipeData = await serverFetch('/api/recipes');
        const recipes = recipeData?.recipes;
        const premiumUser = await protectedFetch('/api/premiumuser')
         const reports = await getReports('/api/reports')
  return (
    <div className="py-4 px-8 bg-background text-foreground min-h-screen">
      {}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your platforms current statistics</p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {}
        <div className="bg-surface border border-border/70 rounded-xl p-6 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Users</p>
              <h3 className="text-3xl font-bold mt-2 text-foreground">{users?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-lg bg-mint text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
              <Users2 size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Regular Users
            </span>
          </div>
        </div>

        {}
        <div className="bg-surface border border-border/70 rounded-xl p-6 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Premium Users</p>
              <h3 className="text-3xl font-bold mt-2 text-foreground">{premiumUser?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200">
              <Crown size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary animate-pulse border border-primary/20">
              ★ Premium
            </span>
          </div>
        </div>

        {}
        <div className="bg-surface border border-border/70 rounded-xl p-6 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Recipes</p>
              <h3 className="text-3xl font-bold mt-2 text-foreground">{recipeData?.totalRecipes || recipes?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-lg bg-mint text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
              <Utensils size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Active Content
            </span>
          </div>
        </div>

        {}
        <div className="bg-surface border border-border/70 rounded-xl p-6 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Reports</p>
              <h3 className="text-3xl font-bold mt-2 text-foreground">{reports?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-200">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400">
              Action Required
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;