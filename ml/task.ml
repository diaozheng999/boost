open Boost_internal_promise

type 'a task_def = {
  exec : unit -> 'a promise;
  onInterrupt : (unit -> unit) option;
}

type 'a task

external create : 'a task_def -> 'a task = "create"
  [@@bs.module "../../.."] [@@bs.scope "async", "Task"]

external race : 'a task -> 'b task -> ('a * 'b) task = "race"
  [@@bs.module "../../.."] [@@bs.scope "async", "Task"]

external race3 : 'a task -> 'b task -> 'c task -> ('a * 'b * 'c) task = "race"
  [@@bs.module "../../.."] [@@bs.scope "async", "Task"]

external race4 :
  'a task -> 'b task -> 'c task -> 'd task -> ('a * 'b * 'c * 'd) task = "race"
  [@@bs.module "../../.."] [@@bs.scope "async", "Task"]

external race5 :
  'a task ->
  'b task ->
  'c task ->
  'd task ->
  'e task ->
  ('a * 'b * 'c * 'd * 'e) task = "race"
  [@@bs.module "../../.."] [@@bs.scope "async", "Task"]

external race6 :
  'a task ->
  'b task ->
  'c task ->
  'd task ->
  'e task ->
  'f task ->
  ('a * 'b * 'c * 'd * 'e * 'f) task = "race"
  [@@bs.module "../../.."] [@@bs.scope "async", "Task"]

external race7 :
  'a task ->
  'b task ->
  'c task ->
  'd task ->
  'e task ->
  'f task ->
  'g task ->
  ('a * 'b * 'c * 'd * 'e * 'f * 'g) task = "race"
  [@@bs.module "../../.."] [@@bs.scope "async", "Task"]

external race_all : 'a task array -> 'a array task = "race"
  [@@bs.variadic] [@@bs.module "../../.."] [@@bs.scope "async", "Task"]

external as_promise : 'a task -> 'a promise = "%identity"

external raceAll : 'a task array -> 'a array task = "race"
  [@@bs.variadic]
  [@@bs.module "../../.."]
  [@@bs.scope "async", "Task"]
  [@@deprecated "Renamed to race_all"]

external asPromise : 'a task -> 'a promise = "%identity"
  [@@deprecated "Renamed to as_promise"]
