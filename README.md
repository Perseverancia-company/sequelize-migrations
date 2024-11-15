# Sequelize migrations

These are the migrations for the pacakge 'ts-app-models'.

## Naming convention

Tables should have singular name and not have uppercase characters, example:
- 'property-comment'

## Connection

Create this file `config/config.json` and in it add this configuration([reference]((https://sequelize.org/docs/v6/other-topics/migrations/))):

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "perseverancia-development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "testing": {
    "username": "root",
    "password": null,
    "database": "perseverancia-testing",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "perseverancia-production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
