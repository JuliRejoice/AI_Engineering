# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Projects Feature Setup

### Set up the Supabase Projects Table

To enable the projects feature, you need to set up the projects table in your Supabase database. Follow these steps:

1. Log in to your Supabase dashboard.
2. Navigate to the SQL Editor.
3. Copy the contents of the `supabase/setup-projects-table.sql` file.
4. Paste and run the SQL script in the SQL Editor.

Alternatively, you can run it from the CLI:

```bash
supabase db execute -f supabase/setup-projects-table.sql
```

This will:
- Create a new `projects` table
- Set up Row Level Security (RLS) policies to ensure users can only access their own projects
- Create triggers to automatically update the `updated_at` timestamp
- Grant necessary privileges to authenticated users

### Sample Data

The application includes seed data for projects. When a user logs in, sample projects will be automatically created if none exist for that user.
"# AI_Engineering" 
