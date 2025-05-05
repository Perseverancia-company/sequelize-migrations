# Usage

How to use this repository.

## Create new migration

To create a new migration run this command:

```bash
npx sequelize-cli migration:create --name MIGRATION_NAME
```

## Migrate models

To migrate models run this command:

```bash
npx sequelize-cli db:migrate --env STATE
```

Where STATE is the development state "development", "testing" or "production".
