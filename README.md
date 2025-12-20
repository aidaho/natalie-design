# natalie-design

**Next.js server-side rendered serverless site**



How to run devserver:
```sh
pnpm dev
```


How to run prod build:
```sh
pnpm build
pnpm start
```


How to lint/fix the code:
```sh
pnpm lint
```


How to run tests:
```sh
pnpm test
```


How to check for updates
```sh
ncu
ncu -u
```


How to list available package versions
```sh
pnpm show pkgname versions
```


How to check for security vulnerabilities and patched versions
```sh
pnpm audit | grep -E "high|critical" -B3 -A10
```

How to auto-translate new project descriptions
``` sh
scripts/update-translations.sh public/projects/pages/charcoal-apartment/en.mdx
```

How to prepare images before committing into a tree
```sh
mogrify -quality 65 -resize 2048x2048\> *.jpg
for f in *.png; do convert "$f" -quality 65 -resize 2048x2048\> "${f%.png}.jpg"; done
```
