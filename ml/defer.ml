open Boost_internal_promise

external defer: ('a -> 'b promise [@bs.uncurry]) -> ('a -> 'b promise [@bs]) = "defer" [@@bs.module "../async/defer.js"]
external defer2: ('a -> 'b -> 'c promise [@bs.uncurry]) -> ('a -> 'b -> 'c promise [@bs]) = "defer" [@@bs.module "../async/defer.js"]
external defer3: ('a -> 'b -> 'c -> 'd promise [@bs.uncurry]) -> ('a -> 'b -> 'c -> 'd promise [@bs]) = "defer" [@@bs.module "../async/defer.js"]
external defer4: ('a -> 'b -> 'c -> 'd -> 'e promise [@bs.uncurry]) -> ('a -> 'b -> 'c -> 'd -> 'e promise [@bs]) = "defer" [@@bs.module "../async/defer.js"]
external defer5: ('a -> 'b -> 'c -> 'd -> 'e -> 'f promise [@bs.uncurry]) -> ('a -> 'b -> 'c -> 'd -> 'e -> 'f promise [@bs]) = "defer" [@@bs.module "../async/defer.js"]
