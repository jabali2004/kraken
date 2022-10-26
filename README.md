# 🐙 Kraken - Software Engineer challenge

This repository is meant to be used as a challenge for Software Engineer candidates at Tradebyte within CPS.

You should fork/clone this repository to use as a basis for the challenge.

## The challenge
The purpose of this challenge is to build an application metadata management application.
The metadata are arbitrary key value pairs. The application name can be expected to be unique and may be used as a reference for a relationship between applications. (e.g. application a depends on application b)
You can use the framework(s) and language(s) of your choosing.

**Requirements:**

* Store application metadata
    * The metadata are arbitrary key value pairs.
    * The key `name` is the only required key value pair and should be unique.
    * There might be a `depends-on` key value pair which can reference a name of another application which should link to the application.
* Choose (an) appropriate framework(s) to build:
    * A frontend for the application metadata
        * It should provide the ability to do [CRUD] operations.
    * An API (REST, GraphQL, …) to be able to programmatically connect to the data.
        * This should also provide [CRUD] operations.
    * Backend including data storage (SQlite, Redis, Postgres, …)
    * This should provide the data to the frontend and api.
    * Note: It is fine to build a monolithic application or split it up into multiple parts.
* You can run this application locally in Docker or any other appropriate service of your choice.
* Please keep maintainability and best practices in mind.
* Think about scalability and performance.

[CRUD]: https://en.wikipedia.org/wiki/Create%2C_read%2C_update_and_delete

## Example data (yaml)
### Application alpha
```yaml
name: alpha
version: 1.2.0
stack: “python-django”
description: “This application provides alpha services.”
team: “🦄 Unicorn”
owner: “john.doe@tradebyte.com”
eks-size: “xl”
```

### Application beta
```yaml
name: beta
version: 1.0.0
depends-on: alpha
stack: “java-spring” 
description: “This application provides beta services on top of alpha.”
team: “🦆 Duck”
owner: “max.mustermann@tradebyte.com”
eks-size: “m”
```

### Application gamma
```yaml
name: gamma
version: 0.1.0
depends-on: 
  - alpha
  - beta
stack: “java-spring” 
description: “This application provides (pre-release) gamma services on top of alpha and beta.”
team: “🐒 Monkey”
owner: “rosanna.thompson@tradebyte.com”
eks-size: “s”
```

### Application delta
```yaml
name: delta
version: 1.1.0
stack: “java-spring” 
description: “This application provides delta services.”
team: “🐬 Dolphin”
owner: “madhu.amit@tradebyte.com”
eks-size: “m”
```

## Contributing

We love contributions from everyone. By participating in this project, you agree to abide by our [code of conduct](https://tradebyte.github.io/Code-of-Conduct/).

We expect everyone to follow the code of conduct anywhere in `kraken-software-engineer-challenge`'s project codebases, issue trackers, chatrooms, and mailing lists.<br/>
Thank you, [contributors]!

[contributors]: https://github.com/tradebyte/kraken-software-engineer-challenge/graphs/contributors

## License

Copyright (c) 2022 by the Tradebyte Software GmbH.<br/>
`kraken-software-engineer-challenge` is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[license]: /LICENSE

## About

`kraken-software-engineer-challenge` is maintained and funded by the Tradebyte Software GmbH. <br/>
The names and images for `kraken-software-engineer-challenge` are trademarks of the Tradebyte Software GmbH.

We love free software!
