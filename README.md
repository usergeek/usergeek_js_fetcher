# About

Main goal of this project is to create a typescript reference implementation that demonstrates how to fetch DAU, WAU, MAU and New Users metrics from [Usergeek](https://usergeek.app).

# How-to

### Install dependencies:

```
npm install
```

### Specify settings in `.env` file:

By default, `.env` file is not provided. You need to create it manually.

LAST_N_DAYS is 30 days by default.

```
API_KEY=<API_KEY>
LAST_N_DAYS=<LAST_N_DAYS>
```

### Provide `Identity` used by actor.

Please modify `src/auth.ts` file.
By default `Secp256k1KeyIdentity` is used with random seed.

> **IMPORTANT**: Principal of provided Identity must be added as a member of the project in Usergeek.

### Run script:

```
npm run start
```

# Output

Result of the script is a file `output_{time}.json` created in the root directory of the project.

`dau`, `wau`, `mau` and `newUsers` metrics are data points that are returned in the following format:
```json
{
  "x": number // UTC timestamp in milliseconds
  "y": number // value
}
```

Example output:
```
{
  "activeUsersToday": 33,
  "activeUsersLast7Days": 152,
  "newUsersToday": 12,
  "newUsersLast7Days": 53,
  "totalUsers": 3412,
  "dau": [
    {
      "x": 1709045047000,
      "y": 8
    },
    ...
  ],
  "wau": [
    {
      "x": 1709045047000,
      "y": 21
    },
    ...
  ],
  "mau": [
    {
      "x": 1709045047000,
      "y": 42
    },
    ...
  ],
  "newUsers": [
    {
      "x": 1709045047000,
      "y": 1
    },
    ...
  ]
}
```

# Troubleshooting

- If you see `API key is empty` - it means that you didn't provide API key in `.env` file.
- If you see `Cannot get api { notAccess: null }` - it means that provided Principal is not added as a member of the project in Usergeek.