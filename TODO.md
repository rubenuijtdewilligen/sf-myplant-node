## Authentication

- [x] Log in with email/username and password (`POST /login`).
- [x] Drop-in `login()` wrapper on `MyPlantClient`.

## Activities

- [x] Retrieve all upcoming activities (`GET /activities`).
- [x] Retrieve single activity details, form questions, and participants (`GET /activities/{activityId}`).
- [x] Sign up or join waitlist for an activity (`POST /activities/{activityId}`).
- [x] Remove signup or waitlist registration (`DELETE /activities/{activityId}`).
- [x] Drop-in wrappers (`getActivities`, `getActivity`, `joinActivity`, `removeActivity`).

## WUDjes

- [ ] Retrieve paginated WUD messages (`GET /wudjes`).
- [ ] Post a new WUD message (`POST /wudjes`).
- [ ] Drop-in wrappers (`getWudjes`, `postWudje`).

## Address (Conscribo)

- [ ] Retrieve member address (`GET /address`).
- [ ] Update member address (`PATCH /address`).

## Photo Galleries

- [ ] Retrieve paginated photo galleries (`GET /photo-galleries`).
