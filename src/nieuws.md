---
title: "Nieuws posts"
layout: "layouts/activiteiten/nieuws"
section: "Nieuws"
# permalink: "nieuws.html"

pagination:
  data: collections.blog
  size: 4

permalink: "nieuws/{{ pagination.pageNumber + 1}}/index.html"
paginationPrevText: "Vorige"
paginationNextText: "Volgende"
# paginationAnchor: "#post-list"
---
