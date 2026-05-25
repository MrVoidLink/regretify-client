# Mini-Game Build Log

This document is the working record for the Regretify calculator mini-game on `/`.

Use it to track:

- what we are testing
- which assets or animations were used
- what worked
- what failed
- what was removed and why
- what should carry forward into the main mini-game build

This file is not product copy. It is an internal build log for implementation and test history.

## Goal

The mini-game on `/` is a lightweight 3D archery interaction that should:

- let the user choose a market
- let the user aim and release a shot
- reveal the asset-selection step
- feel premium, playful, and controllable without becoming a full game project

The current production direction remains the one defined in `PROJECT.md`:

- `three.js`
- `@react-three/fiber`
- `@react-three/drei`
- optimized `GLB` assets for character, bow, arrow, and target
- code-rendered bowstring
- lightweight stylized motion and reactions

## Logging Rules

- Add a new dated entry for every meaningful test pass.
- Record the exact asset, animation, or interaction idea being tested.
- Record the outcome plainly, including failures.
- If something is removed, say why it was removed.
- If a lesson should affect the main build later, add it under `Carry Forward`.
- Keep short notes factual. Do not rewrite history after the fact.

## Current Status

As of `2026-05-23`:

- the `/` route is running an interactive 3D archery prototype again
- the previous `25 / 33 / 41 / 50 / 58 / 66 / 75` live clip ladder is no longer the only proven way to aim
- a single-rig aiming pass has now been validated on top of:
  - `shooting-arrow-50-trim24-skin-test.fbx`
- the key discovery from this pass is:
  - single-file angle control does work
  - the earlier failures came from incomplete pose reconstruction, not from the single-rig idea itself
- the full-draw reference point for angle comparison is now explicit:
  - `clipProgress = 0.40625`
- the full pose-sheet reference for that moment now lives in:
  - `docs/mini-game/full-draw-bone-dump.json`
- the controller now works when it applies the full recorded pose state instead of only a hand-picked subset of bones
- the successful proof has now expanded from the first narrow validation range:
  - `50 -> 58`
  - to the full active range:
  - `25 -> 33 -> 41 -> 50 -> 58 -> 66 -> 75`
- the full-anchor proof pass has been kept as the validation baseline for the single-rig method
- the active runtime aim range has since been narrowed to:
  - `25 -> 50 -> 100`
- the active pose-sheet payload has been trimmed down to the anchor data still needed by runtime:
  - `25 / 50 / 75 / 100`
- this proved that missing pose elements were the main cause of the earlier twisting and body-balance failures
- desktop `OBJ` bow and arrow test assets are mounted directly on the runtime rig
- the bow is attached to `mixamorigLeftHand`
- the hand arrow now uses a tail-pivot setup on the right hand so the tail can stay anchored while the head is tuned by rotation
- `50` is the approved visual baseline for arrow-on-bow alignment
- the working alignment method is now clear:
  - lock the arrow tail first
  - compare every other angle step against `50`
  - tune the arrow head by per-step rotation only
- `58`, `66`, and `75` have now been tuned against the `50` baseline closely enough for the current pass
- the target is now placed from sampled shot trajectories, not only from visual framing guesses
- projectile hit detection now uses the arrow tip crossing the front plane of the target instead of a simple center-distance check
- target hits now leave a stuck arrow and trigger a short wobble reaction
- the stage now shows a live shot preview trace while aiming so the expected impact point is visible before release
- projectile arrow rotation now follows flight direction more smoothly instead of staying locked to the release pose
- a successful target hit now advances the flow into `asset-selection` with the currently selected market carried forward in the URL
- the top-left debug overlay now exposes:
  - `target`
  - `visible`
  - `tip dY`
  - `tip dZ`
  - `tail gap`
- release now spawns a separate projectile arrow using sampled world position, quaternion, and scale from the hand arrow
- the active runtime character has now changed from the old test baseline to:
  - `public/models/playground-shooting-arrow-1k-rig.fbx`
- the active pose sheet has been regenerated for that rig from:
  - `25 / 50 / 75 / 100`
- release recovery now returns the character toward the `50` baseline with a dedicated blend pass instead of sharing one hard reset timing
- hit detection now resolves against the rotated front face plane of the target instead of an axis-aligned fallback plane
- the stuck-arrow orientation now stays normal to the target face while still using the real hit point on that face
- the dashed preview trace has been removed from the live stage because it is no longer needed in the current interaction
- the remaining active tuning issue is now concentrated in the hand-arrow attachment:
  - the tail / pinch placement is close but not fully approved yet
  - at higher aim angles the arrow can still drift slightly toward the back-hand side
  - the next pass should tune this only through the documented `50` baseline tail-pivot method, not by inventing a new attachment model

### 2026-05-23 - Switched Active Mini-Game Runtime To The New 1K Rig

#### Objective

Replace the old active mini-game character with the new lighter 1K rigged character while keeping the old runtime path available as a fallback reference.

#### Test Setup

- active character asset:
  - `public/models/playground-shooting-arrow-1k-rig.fbx`
- fallback reference character:
  - `public/models/shooting-arrow-50-trim24-skin-test.fbx`
- active pose anchors used to rebuild runtime aim:
  - `25`
  - `50`
  - `75`
  - `100`
- rebuilt pose sheet:
  - `docs/mini-game/full-draw-bone-dump.json`

#### What Was Attempted

- switched the live `/` route character over to the new 1K rig
- matched the visible character scale and stage placement to the previous live setup
- rebuilt the runtime aim sheet from the new rig's `25 / 50 / 75 / 100` anchor files
- re-tuned release recovery so the new rig can return toward the `50` baseline without collapsing the old character's pose assumptions onto the new body
- reduced the bow scale
- shortened the arrow while preserving tail-first alignment on the hand
- moved target hit resolution from a coarse axis-aligned plane to the real rotated front face plane
- removed the dashed preview trace from the stage

#### Result

- the new 1K rig is now the active mini-game runtime character
- mouse-driven aim is working again on the new character with its own pose-sheet data
- the release phase is stable enough to keep, with only a minor residual micro-jump that is acceptable for now
- the target leaves a stuck arrow again and the final stuck-arrow orientation now matches the target face better
- the live stage is visually cleaner without the dashed preview overlay

#### Problems Found

- the old procedural pose and release values could not be reused directly on the new rig even when bone naming stayed compatible
- release recovery still has a very small first-frame jump, but it is not currently blocking
- target impact placement had to be corrected twice:
  - first to stop snapping incorrectly
  - then to keep the hit point real while making the arrow sit normal to the target face
- hand-arrow placement on the new rig is still not fully approved:
  - in the baseline pose it is close, but not final
  - at higher aim angles it can still read as sitting too far back relative to the hand
  - this should be solved in the next pass by refining the baseline hand transform and rotation, not by replacing the tail-pivot model

#### Carry Forward

- treat the new 1K rig as the active tuning baseline from here forward
- keep `50` as the visual baseline for draw and release tuning
- when adjusting arrow alignment, keep using the documented tail-first method and do not solve the tip by moving the whole attachment blindly
- for target logic, keep separating:
  - hit detection on the real face plane
  - final arrow orientation normal to the face
- the preview trace should stay removed unless a future UX pass proves a real need for it again
- the next alignment pass should focus only on:
  - `baseArrowHandTransform`
  - baseline arrow rotation
  - validation against `tail gap`, `tip dY`, and `tip dZ`

## Test Log

### 2026-05-18 - Reset After First Throwaway Test

#### Objective

Try a fast character-only test to see whether a temporary archer animation could be scrubbed by drag input and used as a rough aiming prototype.

#### Test Setup

- temporary runtime stack used:
  - `three.js`
  - `@react-three/fiber`
  - `@react-three/drei`
- temporary asset used:
  - `public/models/shooting-arrow.fbx`
- temporary route integration:
  - test scene mounted inside the calculator homepage hero on `/`

#### What Was Attempted

- load a temporary `FBX` character animation
- scrub the animation timeline with horizontal drag
- add vertical aim offsets by rotating upper-body bones
- test whether a quick pose-driven prototype could validate the direction before building the proper mini-game setup

#### Result

- the test was not stable enough to keep
- drag behavior broke during iteration
- the temporary animation was not a reliable foundation for the aiming prototype
- the setup was removed completely instead of patching a weak base further

#### What Was Removed

- temporary `MiniGameTestCanvas` implementation
- temporary `FBX` model used for the test
- temporary 3D dependencies that were only installed for that throwaway pass

#### Why It Was Removed

- the prototype stopped behaving predictably
- the test path was starting to cost more than a clean restart
- keeping a broken temporary interaction in the homepage would make the next pass slower, not faster

#### Carry Forward

- we still want a small isolated test before the full mini-game build
- the next test should use a cleaner asset and animation choice
- we should avoid over-investing in a temporary animation that is not clearly suitable for drag-based aiming
- each future test pass should be logged here immediately

### 2026-05-18 - Imported Fresh Test Asset

#### Objective

Stage a fresh copy of the desktop character animation inside the project with a test-specific name so the next mini-game pass can start from a known file.

#### Test Setup

- source asset:
  - `C:\Users\LOQ\Desktop\Shooting Arrow.fbx`
- imported project asset:
  - `public/models/shooting-arrow-test-v1.fbx`
- route or sandbox:
  - not connected yet

#### What Was Attempted

- copied the desktop FBX into the project
- renamed it with a `-test-v1` suffix so it stays clearly separate from future production assets

#### Result

- the fresh test asset is now available inside the repo
- the next interaction test can start from this file instead of the removed throwaway setup

#### Problems Found

- none at import time

#### Carry Forward

- keep all temporary character or animation files explicitly marked as test assets
- do not reuse this filename for a production-ready runtime asset

### 2026-05-18 - Imported Pose Reference Images

#### Objective

Store the desktop screenshots that show useful pose differences for the same downloaded character animation, so future aiming tests can compare against them directly.

#### Test Setup

- source images:
  - `C:\Users\LOQ\Desktop\1.png`
  - `C:\Users\LOQ\Desktop\2.png`
  - `C:\Users\LOQ\Desktop\3.png`
- imported references:
  - `docs/mini-game/references/shooting-arrow-test-reference-1.png`
  - `docs/mini-game/references/shooting-arrow-test-reference-2.png`
  - `docs/mini-game/references/shooting-arrow-test-reference-3.png`

#### What Was Observed

- all three images show the same character setup with different `Shoot Angle` values in Mixamo
- reference `1` is a middle aim pose with `Shoot Angle` around `50`
- reference `2` is a higher aim pose with `Shoot Angle` around `81`
- reference `3` is a lower aim pose with `Shoot Angle` around `17`
- these are pose references only, not runtime assets

#### Result

- the repo now contains angle reference images for low, mid, and high aiming comparisons
- future test passes can use these images to judge whether in-project pose control matches the expected arc direction

#### Carry Forward

- use these screenshots as visual checkpoints during the next character-only aiming test
- keep pose references under `docs/mini-game/references/` instead of mixing them with runtime public assets

### 2026-05-18 - Character Render Test v1

#### Objective

Put the fresh test character back onto the `/` stage with the smallest possible setup, without drag or aiming logic, to verify that the asset renders cleanly in the current homepage shell.

#### Test Setup

- runtime stack:
  - `three.js`
  - `@react-three/fiber`
  - `@react-three/drei`
- asset:
  - `public/models/shooting-arrow-test-v1.fbx`
- route:
  - `/`
- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`

#### What Was Attempted

- restored the 3D dependencies needed for the test pass
- created a small client-side canvas component just for rendering the character
- mounted the character test canvas inside the homepage stage
- left drag, aim, and release logic out on purpose

#### Result

- the project now has a clean character-only test pass on the homepage stage
- this pass is only for confirming asset render and scene placement before interaction work starts

#### Problems Found

- none recorded yet in this step

#### Carry Forward

- keep interaction logic out until basic render framing is approved
- once the character placement looks right, start the next pass with aim control only

### 2026-05-18 - Character Framing Adjustment v1

#### Objective

Move the test character into the intended left-side scene zone and reduce its size so the stage composition matches the UI reference direction more closely.

#### Test Setup

- asset:
  - `public/models/shooting-arrow-test-v1.fbx`
- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- change type:
  - scene framing only

#### What Was Attempted

- reduced the rendered character scale
- shifted the character further left in the scene
- kept camera and lighting unchanged for this pass

#### Result

- the character now targets the left-side placement zone instead of sitting near the middle of the stage

#### Problems Found

- final camera framing may still need refinement after visual review

#### Carry Forward

- adjust camera only after confirming the new left placement is directionally correct

### 2026-05-18 - Character Vertical Nudge v1

#### Objective

Raise the test character slightly after the first left-side framing pass placed it too low in the stage.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- change type:
  - vertical position only

#### What Was Attempted

- increased the character `y` position while keeping the current scale and left offset unchanged

#### Result

- the character now sits higher in the stage for the next visual check

#### Carry Forward

- keep camera unchanged until the body height feels correct relative to the floor and hero frame

### 2026-05-18 - Character Box Fit Adjustment v1

#### Objective

Reduce the character size further and lift it slightly so the full body fits inside the intended left-side framing box.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- change type:
  - scale and vertical fit

#### What Was Attempted

- reduced the render scale again
- nudged the character upward without changing the current left offset

#### Result

- the character should now fit more cleanly inside the intended box area for the next visual check

#### Carry Forward

- once box fit is approved, lock framing and move on to pose control

### 2026-05-18 - Character Animation Autoplay Test v1

#### Objective

Confirm that the imported FBX animation can play directly in the homepage test scene instead of only rendering a static pose.

#### Test Setup

- asset:
  - `public/models/shooting-arrow-test-v1.fbx`
- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- change type:
  - animation playback only

#### What Was Attempted

- configured the first available animation action to start from time `0`
- set the action to `LoopRepeat`
- forced the action to autoplay with full weight and normal playback speed

#### Result

- the character test scene is now set up to autoplay the embedded FBX animation if the asset contains a usable clip

#### Carry Forward

- if the visible motion is acceptable, the next pass can focus on pausing or scrubbing the same animation for aiming control

### 2026-05-18 - FBX Clip Inspection Fix

#### Objective

Find out why the imported character appeared static even after autoplay was enabled.

#### Test Setup

- asset:
  - `public/models/shooting-arrow-test-v1.fbx`
- inspection method:
  - local `FBXLoader.parse()` check from the workspace

#### What Was Observed

- the FBX contains `2` animation clips
- clip `Take 001` has duration `0`
- clip `mixamo.com` has duration `5`
- the previous test code was trying to play the first clip by default

#### Result

- the autoplay logic now selects the first clip with a real duration instead of blindly using the first clip entry

#### Carry Forward

- do not assume `names[0]` is a playable animation in imported FBX files
- future loaders should prefer the first non-zero-duration clip when testing Mixamo exports

### 2026-05-18 - Drag Draw And Release Test v1

#### Objective

Replace autoplay with direct interaction so the same FBX clip can be tested as a draw-and-release character pass.

#### Test Setup

- asset:
  - `public/models/shooting-arrow-test-v1.fbx`
- route:
  - `/`
- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- interaction:
  - horizontal drag for draw
  - vertical drag for aim offset
  - pointer release for shot playback

#### What Was Attempted

- removed autoplay as the primary test mode
- added a full-stage pointer interaction layer over the canvas
- scrubbed the playable clip manually during drag instead of letting it free-run
- limited the drag scrub to the draw/aim portion of the clip
- added upper-body bone offsets so vertical drag changes the aiming pose
- used release to drive the clip through the remaining shot portion and then reset back to idle

#### Result

- the character test scene now behaves like a basic interaction prototype instead of a passive animation preview

#### Carry Forward

- if release timing feels wrong, inspect the clip window again rather than changing the full interaction structure first
- once drag and release feel directionally correct, the next pass can refine pose quality and shot timing

### 2026-05-18 - Nocked Arrow Start Window Adjustment

#### Objective

Skip the early part of the animation where the character prepares the shot, and start interaction from the point where the arrow is already placed on the bow.

#### Test Setup

- asset:
  - `public/models/shooting-arrow-test-v1.fbx`
- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- change type:
  - clip window remap

#### What Was Attempted

- replaced the old draw scrub start with a later normalized clip point
- changed the idle state to rest on the nocked-arrow pose instead of the pre-draw setup
- separated the draw/aim window from the release end window so release can continue into the shot

#### Result

- the interaction now begins from a later pose in the animation timeline where the arrow should already be on the bow

#### Carry Forward

- if the chosen start point is still too early or too late, tune the clip windows before changing the drag model itself

### 2026-05-18 - Nocked Start Timing Correction

#### Objective

Move the interaction start earlier because the previous nocked start point was already too far into the pose, after the character had visually settled into a straighter stance.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- change type:
  - start window timing only

#### What Was Attempted

- shifted `nockedPoseStart` earlier in the clip
- shifted the draw/aim end slightly earlier with it so the drag window stays focused on the relevant aiming section

#### Result

- the next pass should begin closer to the moment where the arrow has just been placed on the bow, instead of a later straightened pose

#### Carry Forward

- keep refining the clip window until the start pose matches the intended “arrow placed, ready to draw” state

### 2026-05-18 - Nocked Start Forward Nudge

#### Objective

Correct the previous timing change after it pushed the interaction start too far back in the clip.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- change type:
  - start window timing correction

#### What Was Attempted

- moved the interaction start forward again
- expanded the draw/aim end with it so the usable drag range stays balanced

#### Result

- the next visual check should start later than the previous pass and closer to the intended nocked-arrow pose

#### Carry Forward

- keep tuning this window in small increments until the first visible pose is exact

### 2026-05-18 - Nocked Start Midpoint Correction

#### Objective

Place the interaction start between the two previous timing passes after the user clarified that the desired start is immediately after the arrow is taken from behind and set on the bow.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- change type:
  - clip window midpoint retune

#### What Was Attempted

- moved the interaction start slightly back from the previous pass
- tightened the draw/aim end to keep the overall drag window aligned with that earlier start

#### Result

- the next check should begin closer to the exact post-nock pose instead of the later settled stance

#### Carry Forward

- once this start frame is approved, stop retuning the clip window and move on to pose quality only

### 2026-05-18 - Approved Nocked Start For Current Test

#### Objective

Lock the current start timing after direct visual review in the workspace.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- approved value:
  - `nockedPoseStart = 0.32`

#### Result

- the current test baseline now starts from `0.32`
- this value is considered the accepted start point for the present aiming test pass

#### Carry Forward

- use `0.32` as the fixed start value while refining draw feel, aim quality, and release timing
- do not keep retuning the start window unless a later test proves the assumption wrong

### 2026-05-18 - Slower Interaction Tuning v1

#### Objective

Reduce the perceived speed of the current character test so draw and release feel less abrupt.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- fixed baseline:
  - `nockedPoseStart = 0.32`

#### What Was Attempted

- reduced horizontal draw sensitivity so more cursor travel is needed
- increased release duration
- increased the short delay before resetting back to the start pose

#### Result

- the current interaction should feel more slow-motion and less snappy than the previous pass

#### Carry Forward

- refine speed with interaction constants first before changing the clip window or aim model

### 2026-05-18 - Release Hand Drag Hotspot

#### Objective

Make the draw interaction start from the character's release-hand zone instead of allowing drag from anywhere on the stage.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- interaction change:
  - release-hand hotspot only

#### What Was Attempted

- removed drag start from the full scene area
- added a visible release-hand marker over the stage
- positioned the marker near the current release hand and let it shift slightly with draw/aim state
- kept pointer release tied to the existing shot/release playback

#### Result

- the current test now starts from a dedicated hand marker instead of an arbitrary drag origin

#### Carry Forward

- if the marker feels spatially off, retune its screen-space position before changing the gesture model

### 2026-05-18 - Reverted Drag Cap Experiment

#### Objective

Undo the short-lived experiment that capped drag before hand-open release after the user clarified that the previous auto-release behavior should stay for now.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- reverted experiment:
  - drag cap without auto-release

#### Result

- the interaction is back to the prior model where drag can move through the approved draw range and pointer release triggers the shot section again

#### Carry Forward

- keep the current release behavior until the user explicitly wants manual hand-open controls built as a separate step

### 2026-05-18 - Approved Draw End For Manual Pull

#### Objective

Lock the manual draw endpoint after direct in-editor tuning.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- approved value:
  - `drawAimPoseEnd = 0.58`

#### Result

- the current manual drag range now ends at `0.58`
- this is the approved stop point before the release section begins

#### Carry Forward

- use `0.58` as the fixed manual draw end while defining exactly where the release-hand opening should start

### 2026-05-18 - Aim Debug Guide Added

#### Objective

Expose the current aiming direction visually before a real target is added to the scene.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- debug helper:
  - line guide plus endpoint marker

#### What Was Attempted

- added a scene-space guide line that appears when the bow is drawn
- mapped the line endpoint to the current draw state and `aimAngle`
- added a small endpoint marker so the user can read the current aim more clearly

#### Result

- the scene now shows a debug aiming direction without needing the real target asset yet

#### Carry Forward

- use this guide to validate aim behavior before adding the actual target and arrow flight

### 2026-05-18 - Aim Debug Guide Removed

#### Objective

Drop the temporary visual guide after deciding to focus on the character's aiming pose itself rather than a debug trajectory aid.

#### Result

- the debug line and endpoint marker were removed
- the current test focus is back on improving the character's aiming angle behavior directly

### 2026-05-18 - Stronger Pre-Release Aim Pose

#### Objective

Make the up/down mouse motion before release affect the aiming pose more clearly, in the same spirit as the Mixamo angle previews.

#### Test Setup

- component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- references:
  - `docs/mini-game/references/shooting-arrow-test-reference-1.png`
  - `docs/mini-game/references/shooting-arrow-test-reference-2.png`
  - `docs/mini-game/references/shooting-arrow-test-reference-3.png`

#### What Was Attempted

- increased the vertical aim range
- extended the angle response beyond spine and shoulders into arm and forearm bones
- increased the pose influence so the high and low aim states read more clearly before release

#### Result

- the current drag-up and drag-down states should now show a stronger angle change on the character itself

#### Carry Forward

- tune the bone weights against the three screenshot references instead of adding unrelated debug UI

### 2026-05-18 - Reverted Stronger Aim Pose Pass

#### Objective

Undo the stronger pre-release aim pose pass after it damaged the character pose instead of improving it.

#### Result

- the added arm and forearm angle offsets were removed
- the broader vertical range was rolled back
- the character is back on the previous, safer angle setup

#### Carry Forward

- future aim adjustments should be smaller and more surgical

### 2026-05-18 - Imported Angle Comparison FBX Files

#### Objective

Bring in dedicated up-angle and down-angle exports so the current baseline animation can be compared against real Mixamo pose variants instead of guessing the pose deltas by hand.

#### Test Setup

- baseline asset in current use:
  - `public/models/shooting-arrow-test-v1.fbx`
- imported comparison assets:
  - `public/models/shooting-arrow-up-test.fbx`
  - `public/models/shooting-arrow-down-test.fbx`
- intended angle set:
  - baseline around `50`
  - up around `75`
  - down around `25`

#### What We Are Going To Do

- compare the baseline, up, and down exports against each other
- identify which bones and pose regions actually change between the three angle states
- use those real differences to decide which character elements should be driven by vertical mouse movement before release
- avoid another broad guess-based bone edit pass until this comparison is done

#### Carry Forward

- use the three Mixamo exports as the source of truth for pre-release aiming pose differences

### 2026-05-18 - Baseline vs Up vs Down Pose Comparison

#### Objective

Measure which bones actually change between the `down`, `mid`, and `up` Mixamo exports so vertical aim can later be driven from real pose differences instead of hand-tuned guesses.

#### Test Setup

- assets compared:
  - `public/models/shooting-arrow-down-test.fbx`
  - `public/models/shooting-arrow-test-v1.fbx`
  - `public/models/shooting-arrow-up-test.fbx`
- sampled progress checkpoints:
  - `0.32`
  - `0.58`
- inspected pose regions:
  - spine
  - upper spine
  - neck
  - head
  - shoulders
  - upper arms
  - forearms
  - hands

#### Result

- all three exports use the same track set:
  - `53` tracks
- the real differences are not in track names, but in pose values
- at the early checkpoint `0.32`, the strongest differences are mostly on the release side:
  - `mixamorigRightForeArm`
  - `mixamorigRightArm`
  - `mixamorigRightHand`
  - `mixamorigRightShoulder`
- at the later checkpoint `0.58`, the strongest differences spread across the full aiming chain:
  - `mixamorigLeftHand`
  - `mixamorigRightForeArm`
  - `mixamorigLeftForeArm`
  - `mixamorigLeftArm`
  - `mixamorigRightArm`
  - `mixamorigRightHand`
  - `mixamorigHead`
  - `mixamorigLeftShoulder`
  - `mixamorigRightShoulder`
  - `mixamorigNeck`
- spine and upper spine do change, but much less than hands / forearms / arms / shoulders
- the differences get much larger by the later draw checkpoint at `0.58`

#### Carry Forward

- vertical aiming should not be driven by spine/neck only
- the main aiming shape depends on coordinated changes across:
  - torso
  - neck/head
  - both arms
  - both forearms
  - both hands
- next step should compare those bones more closely and then apply a narrow, controlled angle system instead of a broad pose hack

### 2026-05-18 - Rebuilt Aim Angle From Real Up/Down Pose Variants

#### Objective

Replace the old hand-tuned bone rotation system with a safer aiming system driven by the real `up` and `down` Mixamo exports.

#### Test Setup

- rendered asset:
  - `public/models/shooting-arrow-test-v1.fbx`
- reference pose sources:
  - `public/models/shooting-arrow-up-test.fbx`
  - `public/models/shooting-arrow-down-test.fbx`
- draw window:
  - `0.32 -> 0.58`
- vertical input:
  - mouse movement while dragging before release

#### What Was Attempted

- loaded the `mid`, `up`, and `down` FBX files together
- advanced all three clips to the same normalized progress on each frame
- kept the `mid` file as the rendered character
- blended selected bones on the rendered character toward:
  - the `up` pose when aim goes upward
  - the `down` pose when aim goes downward
- limited the blend to the bones that actually changed in comparison:
  - spine
  - upper spine
  - neck
  - head
  - shoulders
  - arms
  - forearms
  - hands
- weighted the blend so arms / forearms / hands drive the strongest visible aiming shift

#### Result

- aiming is no longer based on guessed manual offsets
- the pose system now uses real Mixamo pose differences as the source of truth
- draw progress also affects the blend strength, so the angle influence builds as the bow gets pulled back

#### Carry Forward

- next review should focus on how close upward and downward aiming now feel to the real Mixamo preview
- if further tuning is needed, adjust:
  - per-bone blend weights
  - draw-progress influence
  - aim range

### 2026-05-18 - Increased Aim Blend Visibility During Drag

#### Objective

Make the new up/down pose blending show up earlier and more clearly while the user is still dragging.

#### What Was Attempted

- increased the overall pose-blend strength
- changed draw influence so angle starts affecting the pose much earlier in the pull
- changed aim influence so smaller vertical mouse movement produces visible pose change sooner

#### Result

- the angle system should now react earlier during drag instead of waiting until the pull is almost finished
- no structural change was made to the pose source system; this was only a visibility/sensitivity pass

#### Carry Forward

- if this still feels too weak, increase either:
  - `aimBlendStrength`
  - per-bone weights on shoulders / arms / forearms / hands

### 2026-05-18 - Fixed Weak Vertical Drag Mapping

#### Objective

Make sure upward and downward mouse movement during drag produces a visible aiming response instead of feeling non-functional.

#### What Was Attempted

- increased vertical drag sensitivity by adding a dedicated `aimDragHeightFactor`
- changed the angle calculation so vertical movement reaches the aim range much faster

#### Result

- vertical mouse movement should now produce a much stronger `aimAngle` change during drag
- this pass changed input mapping only; the pose source and blend system stayed the same

#### Carry Forward

- if upward/downward aiming is now visible but too aggressive, tune `aimDragHeightFactor`

### 2026-05-18 - Corrected Vertical Aim Direction And Early Blend Gate

#### Objective

Fix the case where moving the mouse up or down during drag appeared to do nothing.

#### What Was Found

- vertical movement had been mapped in the wrong direction relative to the intended `up` and `down` pose targets
- the pose blend also stayed too suppressed until draw progress got much farther along

#### What Was Attempted

- inverted the vertical drag delta so moving the mouse upward now drives the upward pose direction
- changed draw influence so angle blending keeps a visible minimum strength much earlier in the drag

#### Result

- upward/downward drag should now affect the pose sooner and in the correct direction

#### Carry Forward

- if the motion is now visible but still subtle, strengthen the arm / forearm / hand weights next

### 2026-05-18 - Switched Aim Pose Application From Quaternion Blend To Local Rotation Lerp

#### Objective

Fix the case where `aimAngle` changed numerically but the character still appeared visually unchanged.

#### What Was Found

- the input layer was working:
  - `aimAngle` correctly moved between `-18` and `18`
- the remaining problem was in how the target pose was being applied onto the rendered skeleton

#### What Was Attempted

- replaced quaternion-based pose blending with direct local rotation lerp on the driven bones
- kept the same pose sources:
  - `mid`
  - `up`
  - `down`
- kept the same driven-bone list and weighting system

#### Result

- the aiming system now applies target pose deltas more directly on the rendered rig
- this should make vertical drag visibly affect the character if the previous issue came from the quaternion blend path

#### Carry Forward

- if this finally becomes visible, next tuning should focus on strength and naturalness
- if it still does not show, the next debug step should isolate a single obvious bone such as `mixamorigRightForeArm`

### 2026-05-18 - Switched To Direct Up/Mid/Down Pose Variant Display

#### Objective

Use the actual exported Mixamo pose variants more directly after the bone-application path still failed to show visible angle changes.

#### What Was Found

- `aimAngle` input was confirmed to work
- even after changing the pose-application method, the visible character still did not react reliably enough

#### What Was Attempted

- kept all three rigs running at the same normalized clip progress:
  - `down`
  - `mid`
  - `up`
- stopped trying to force the rendered rig into another pose by per-bone blending
- instead, switched the visible character variant directly by aim bands:
  - downward aim shows `down`
  - centered aim shows `mid`
  - upward aim shows `up`

#### Result

- this is the most direct test path because it uses the actual exported pose variants without another transformation layer in between
- if visible angle change now appears, the previous failures came from the pose-application layer, not the source assets

#### Carry Forward

- if this works, the next decision is whether to keep banded switching for test purposes or rebuild smooth interpolation on top of verified pose states

### 2026-05-18 - Inverted Vertical Aim Direction

#### Objective

Match the intended seesaw interaction:

- mouse down -> character aims higher
- mouse up -> character aims lower

#### What Was Attempted

- inverted the vertical drag mapping used to calculate `aimAngle`

#### Result

- the `up / mid / down` pose switching now follows the intended opposite-direction cursor behavior

#### Carry Forward

- next tuning should focus on how quickly the pose changes between the three angle bands

### 2026-05-18 - Replaced Banded Aim Switching With Smooth Pose Interpolation

#### Objective

Remove the visible jump between the three exported aim states and make the aiming pose move smoothly between:

- `25`
- `50`
- `75`

#### What Was Attempted

- kept the three exported source rigs:
  - `down`
  - `mid`
  - `up`
- added a separate render rig
- advanced all rigs to the same clip progress
- used the `mid` pose as the center anchor
- interpolated the render rig toward:
  - `down` as aim moves below center
  - `up` as aim moves above center
- drove interpolation continuously from `aimAngle` instead of switching by bands

#### Result

- the aiming system should now move continuously between the three anchor poses instead of snapping from one to another

#### Carry Forward

- next review should check:
  - whether the interpolation feels smooth enough
  - whether the center pose stays stable
  - whether the extremes still reach the expected `25` and `75` look

### 2026-05-18 - Replaced Failed Bone Interpolation With Pose Crossfade

#### Objective

Keep the visible smoothness goal while avoiding another non-visible bone interpolation pass.

#### What Was Found

- direct pose switching worked reliably
- direct bone interpolation did not produce a trustworthy visible result in the live scene

#### What Was Attempted

- kept the three live pose sources:
  - `down`
  - `mid`
  - `up`
- advanced all three to the same clip progress
- cloned scene materials so each pose variant can have independent opacity
- crossfaded between:
  - `mid` and `down` for negative aim
  - `mid` and `up` for positive aim

#### Result

- the system keeps using the real Mixamo pose variants
- the transition path is now based on opacity blending of real pose states instead of invisible per-bone interpolation

#### Carry Forward

- next review should confirm:
  - whether the pose now changes visibly again
  - whether the crossfade feels acceptable or too ghosted

### 2026-05-18 - Replaced Ghosted Crossfade With Full-Skeleton Pose Interpolation

#### Objective

Keep the pose motion smooth without showing the obvious double-character ghosting caused by opacity crossfade.

#### What Was Found

- pose crossfade did make motion visible
- but it also showed multiple character silhouettes at once, which is not acceptable for the interaction

#### What Was Attempted

- removed the crossfade display path
- restored a single rendered character
- advanced:
  - render
  - mid
  - down
  - up
  rigs to the same clip progress
- interpolated the full render skeleton from the `mid` pose toward:
  - `down` for negative aim
  - `up` for positive aim
- applied both:
  - local bone position interpolation
  - local bone quaternion interpolation
  across the whole available skeleton instead of a small selected subset

#### Result

- the system now keeps one visible character while trying to preserve smooth movement between the three exported anchor poses

#### Carry Forward

- next review should confirm whether:
  - smooth aiming is visible again
  - ghosting is gone

### 2026-05-18 - Detached Render Rig From Mixer During Full-Skeleton Interpolation

#### Objective

Remove the chance that the rendered skeleton's own animation mixer was fighting the copied/interpolated pose.

#### What Was Attempted

- changed the render character into a plain output rig instead of another animated pose source
- kept animation mixers only on:
  - `mid`
  - `down`
  - `up`
- copied/interpolated full-bone local position, quaternion, and scale from the animated source rigs onto the render rig
- forced local matrix updates and then refreshed the render rig world matrix

#### Result

- the rendered character is now only a receiver of pose data, not another independently-animated skeleton

#### Carry Forward

- next review should confirm whether mixer interference was the reason the previous full-skeleton interpolation looked static

### 2026-05-18 - Reverted To Last Known Stable Aim Variant Switching

#### Objective

Recover the working test state after the interpolation experiments made the character fall out of the intended aiming setup.

#### What Was Found

- the recent interpolation path made the character unreliable again
- the last clearly working state was the direct `down / mid / up` variant switch

#### What Was Attempted

- removed the latest interpolation path
- restored direct switching between:
  - `down`
  - `mid`
  - `up`
- kept the existing drag, release, and vertical direction behavior

#### Result

- the test is back on the last known stable angle-behavior setup

#### Carry Forward

- for smooth transitions, do not keep pushing the current runtime interpolation path on these FBX exports
- the safer next step is:
  - either more exported angle steps
  - or a different asset/control pipeline

### 2026-05-18 - Imported Additional Angle-Step FBX Files

#### Objective

Bring in smaller angle-step exports so the test setup can move beyond the coarse `25 / 50 / 75` switching.

#### Test Setup

- previously available angle anchors:
  - `25` -> `public/models/shooting-arrow-down-test.fbx`
  - `50` -> `public/models/shooting-arrow-test-v1.fbx`
  - `75` -> `public/models/shooting-arrow-up-test.fbx`
- newly imported angle anchors:
  - `33` -> `public/models/shooting-arrow-33-test.fbx`
  - `41` -> `public/models/shooting-arrow-41-test.fbx`
  - `58` -> `public/models/shooting-arrow-58-test.fbx`
  - `66` -> `public/models/shooting-arrow-66-test.fbx`

#### Result

- the current test ladder is now:
  - `25`
  - `33`
  - `41`
  - `50`
  - `58`
  - `66`
  - `75`

#### Carry Forward

- next implementation pass should switch between the full seven-step ladder instead of only:
  - `25`
  - `50`
  - `75`

### 2026-05-18 - Switched Aim Test From 3-Step To 7-Step Angle Ladder

#### Objective

Reduce the coarse visual jump by switching across a denser set of exported aim poses.

#### What Was Attempted

- replaced the old three-step set:
  - `25`
  - `50`
  - `75`
- with the full seven-step ladder:
  - `25`
  - `33`
  - `41`
  - `50`
  - `58`
  - `66`
  - `75`
- mapped the runtime `aimAngle` range onto a virtual `25 -> 75` shoot-angle scale
- selected the nearest exported step to that mapped angle

#### Result

- the test now switches between seven real Mixamo anchor poses instead of three
- this should noticeably reduce the size of each visible pose jump

#### Carry Forward

- next review should focus on:
  - whether the new step density feels acceptable
  - which remaining gaps are still too visible

### 2026-05-18 - Expanded Aim Ladder To Full 0-100 Range

#### Objective

Widen the usable up/down aiming range by adding more exported pose anchors above `75` and below `25`.

#### Test Setup

- newly imported lower-range anchors:
  - `0` -> `public/models/shooting-arrow-0-test.fbx`
  - `9` -> `public/models/shooting-arrow-9-test.fbx`
  - `17` -> `public/models/shooting-arrow-17-test.fbx`
- newly imported upper-range anchors:
  - `83` -> `public/models/shooting-arrow-83-test.fbx`
  - `91` -> `public/models/shooting-arrow-91-test.fbx`
  - `100` -> `public/models/shooting-arrow-100-test.fbx`

#### What Was Attempted

- extended the runtime ladder from:
  - `25 / 33 / 41 / 50 / 58 / 66 / 75`
- to:
  - `0 / 9 / 17 / 25 / 33 / 41 / 50 / 58 / 66 / 75 / 83 / 91 / 100`
- changed the aim mapping from the narrower `25 -> 75` virtual range to the full `0 -> 100` range
- kept the same nearest-step switching model

#### Result

- the vertical drag test now has a much wider aiming envelope above and below the center `50` pose

#### Carry Forward

- next review should focus on:
  - whether the wider range still feels controllable
  - whether any missing gaps remain around the extremes

### 2026-05-18 - Exported Angle-Pose Comparison Table

#### Objective

Produce a readable table of the bones that actually change across the 13 exported angle states.

#### Result

- full table written to:
  - `docs/mini-game/angle-pose-table.md`
- table basis:
  - normalized progress `0.58`
  - local Euler rotation values
  - all quaternion-driven bones with meaningful variation across the 13 angle exports

#### Carry Forward

- use this table as the reference if we later move from multi-file switching to:
  - one character file
  - plus extracted pose data

### 2026-05-18 - Created Single-Rig Test Target

#### Objective

Prepare a single working character file so the next control experiment can apply extracted angle-pose data onto one rig instead of switching across all exported variants.

#### Test Setup

- single-rig target copy:
  - `public/models/shooting-arrow-single-rig-test.fbx`
- source used for the copy:
  - `public/models/shooting-arrow-test-v1.fbx`
- pose references remain the 13 exported angle files

#### Carry Forward

- next control pass should target:
  - one file for runtime character display
  - 13 files only as pose references
- first focused validation point for this experiment:
  - near draw progress `0.58`

### 2026-05-18 - Switched Runtime Display To Single Rig With 13 Pose References

#### Objective

Move the visible runtime character from multi-file scene switching to a single visible rig that receives pose data from the nearest angle reference.

#### What Was Attempted

- used:
  - `public/models/shooting-arrow-single-rig-test.fbx`
  as the only visible runtime character
- kept the 13 angle exports as hidden animated pose references
- advanced all reference rigs to the same `clipProgress`
- mapped runtime aim to the nearest exported angle step
- copied local node transforms from the selected reference rig onto the visible single rig each frame

#### Result

- the visible scene now uses one character file for display
- the 13 exported files are still used only as pose references for this test pass

#### Carry Forward

- next review should confirm whether this single-rig copy approach preserves the working angle behavior near `0.58`

### 2026-05-18 - Stopped Single-Rig Full-Node Copy Pass

#### What Was Found

- the first single-rig runtime copy pass broke the visible character immediately from the start pose
- the problem came from copying the full scene node transforms directly, not from a safe limited pose layer near `0.58`

#### What Was Attempted

- reverted from the broken single-rig full-node copy pass
- restored the last stable 13-step multi-variant switching setup

#### Carry Forward

- if we revisit the single-rig path, do not copy the full scene graph from frame zero
- the next single-rig attempt should be limited to:
  - safe driven bones only
  - and a controlled test near `0.58`

### 2026-05-18 - Limited Vertical Aim Control To The 0.58 Draw Checkpoint

#### Objective

Match the current data reality: vertical aim should only be editable when the draw reaches the checkpoint we actually analyzed.

#### What Was Attempted

- added an activation gate for vertical aim
- kept horizontal draw active across the full draw window
- enabled `aimAngle` updates only when `clipProgress` is within a small window near:
  - `drawAimPoseEnd = 0.58`

#### Result

- before the draw reaches the end checkpoint, vertical mouse movement no longer changes aim
- once the draw is near `0.58`, vertical aiming becomes active

#### Carry Forward

- this keeps the runtime behavior aligned with the only reliable extracted pose table we currently have

### 2026-05-18 - Built Single-Rig 0.58 Aim Override From Extracted Pose Data

#### Objective

Use one visible runtime character while applying the extracted 13-angle pose data only at the analyzed `0.58` checkpoint.

#### What Was Attempted

- generated extracted pose data file:
  - `src/features/calculator/data/miniGameAimPose58.ts`
- used:
  - `public/models/shooting-arrow-single-rig-test.fbx`
  as the only runtime character model
- removed the 13 FBX angle variants from live scene rendering
- kept the base animation active on the single rig
- applied pose-data overrides only when draw is near:
  - `0.58`
- before that checkpoint:
  - the single file keeps its normal animation behavior from `0.32` up to the aim gate

#### Result

- runtime display is now based on one visible file
- the 13 exported FBX files are no longer needed as live scene variants for this test pass
- the current angle-control layer is explicitly scoped to the `0.58` checkpoint data we extracted

#### Carry Forward

- next review should confirm:
  - whether the single-rig behavior now stays stable before `0.58`
  - whether the aim override works cleanly near `0.58`

### 2026-05-18 - Restricted Single-Rig Aim Override To Safe Upper-Body Bones

#### Objective

Stop the single-rig mesh from breaking apart when the `0.58` aim-pose data is applied.

#### What Was Attempted

- reviewed the failed single-rig pass and treated the problem as an unsafe full-pose override
- stopped copying extracted `position` values from the `0.58` pose data
- limited runtime aim override to quaternion-only rotation updates
- limited the overridden bone set to a safe upper-body subset:
  - `mixamorigSpine`
  - `mixamorigSpine1`
  - `mixamorigSpine2`
  - `mixamorigNeck`
  - `mixamorigHead`
  - `mixamorigLeftShoulder`
  - `mixamorigRightShoulder`
  - `mixamorigLeftArm`
  - `mixamorigRightArm`
  - `mixamorigLeftForeArm`
  - `mixamorigRightForeArm`
  - `mixamorigLeftHand`
  - `mixamorigRightHand`

#### Result

- the single-rig test no longer tries to override the whole skeleton hierarchy with extracted transforms
- aim control near `0.58` is now limited to the part of the rig that should actually react to vertical aiming

#### Carry Forward

- if the rig is still unstable, the next reduction should be:
  - even fewer driven bones
  - and possibly only shoulder/arm/forearm/hand bones first

### 2026-05-18 - Reduced 0.58 Single-Rig Aim Override To Angle-Likely Bones Only

#### Objective

Stop driving baked compensation bones and keep the single-rig test focused on angle-only candidates.

#### What Was Attempted

- reviewed the extracted `0.58` pose table and treated these as likely compensation or whole-body balancing bones for now:
  - `spine`
  - `spine1`
  - `spine2`
  - `neck`
  - `head`
  - `hips`
  - legs and feet
- reduced the single-rig aim override subset to:
  - `mixamorigLeftShoulder`
  - `mixamorigRightShoulder`
  - `mixamorigLeftArm`
  - `mixamorigRightArm`
  - `mixamorigLeftForeArm`
  - `mixamorigRightForeArm`
  - `mixamorigLeftHand`
  - `mixamorigRightHand`

#### Result

- the `0.58` test now follows only the bones most likely tied to visible aim direction
- upper-body compensation bones are temporarily excluded from runtime override

#### Carry Forward

- if the pose is still wrong, the next pass should isolate:
  - shoulders and arms only
  - then add forearms
  - then add hands last

### 2026-05-18 - Isolated 0.58 Aim Test To ForeArm And Hand Bones Only

#### Objective

Reduce the runtime override to the smallest wrist/hand-adjacent subset and see whether the instability comes from wider upper-body overrides.

#### What Was Attempted

- treated Mixamo forearm bones as the nearest practical stand-in for wrist control
- reduced the active override subset to:
  - `mixamorigLeftForeArm`
  - `mixamorigRightForeArm`
  - `mixamorigLeftHand`
  - `mixamorigRightHand`

#### Result

- the `0.58` single-rig angle test is now limited to forearm and hand pose data only

#### Carry Forward

- if this is still unstable, the next split should be:
  - hands only
  - then forearms only

### 2026-05-18 - Reduced 0.58 Aim Test To Hand Bones Only

#### Objective

Check whether forearm rotation data is the source of the visible single-rig breakage.

#### What Was Attempted

- removed both forearm bones from the active override subset
- kept only:
  - `mixamorigLeftHand`
  - `mixamorigRightHand`

#### Result

- the `0.58` aim override now tests hand-only pose influence

#### Carry Forward

- if the rig is finally stable, forearms are likely not safe to drive directly from the extracted `0.58` data
- if it still breaks, the hand data itself is not safe enough either

### 2026-05-18 - Switched 0.58 Aim Test From Hand Bones To Shoulder And Arm Bones

#### Objective

Check whether visible aim direction is driven more safely from shoulder and upper-arm bones rather than hand-level pose data.

#### What Was Attempted

- treated the hand-only pass as a diagnostic result rather than a target solution
- removed:
  - `mixamorigLeftHand`
  - `mixamorigRightHand`
- switched the active aim subset to:
  - `mixamorigLeftShoulder`
  - `mixamorigRightShoulder`
  - `mixamorigLeftArm`
  - `mixamorigRightArm`

#### Result

- the current `0.58` single-rig test now checks shoulder and upper-arm influence only

#### Carry Forward

- if this looks more like true aiming direction, hands and forearms should stay excluded
- if this still fails, we should isolate:
  - shoulders only
  - then arms only

### 2026-05-18 - Reduced 0.58 Aim Test To Shoulder Bones Only

#### Objective

Check whether upper-arm bones are the source of the remaining deformation and keep only the shoulder joints active.

#### What Was Attempted

- removed:
  - `mixamorigLeftArm`
  - `mixamorigRightArm`
- kept only:
  - `mixamorigLeftShoulder`
  - `mixamorigRightShoulder`

#### Result

- the current `0.58` single-rig test now isolates shoulder-only pose influence

#### Carry Forward

- if shoulders are still unsafe, the extracted `0.58` bone override path is likely not reliable even at the shoulder level
- if shoulders are stable, we can test arms alone next instead of shoulder-plus-arm

### 2026-05-18 - Replaced 0.58 Pose Override With Additive Upper-Body Rotation

#### Objective

Stop chasing unsafe extracted bone overrides and switch to a simpler upper-body aim illusion on the single runtime rig.

#### What Was Attempted

- disabled the extracted `0.58` angle-pose override path for runtime aiming
- kept the single-file animation flow intact from:
  - `0.32`
  - to `0.58`
- kept vertical aim activation gated near:
  - `0.58`
- replaced pose injection with additive rotation on a small spine chain only:
  - `mixamorigSpine`
  - `mixamorigSpine1`
  - `mixamorigSpine2`
- left lower body, shoulders, arms, forearms, hands, and fingers on the original animation

#### Result

- the current aim test no longer depends on copying baked pose data from the 13 reference files into the live rig
- runtime aiming is now a controlled upper-body tilt rather than a full pose swap

#### Carry Forward

- next review should confirm:
  - whether this feels stable
  - whether the tilt direction matches the expected up/down aiming behavior
  - whether `spine` only is enough or `neck/head` should be added later in very small amounts

### 2026-05-18 - Removed Upper-Body Twist And Switched Aim To Pitch-Only Bend

#### Objective

Make the upper body bend up/down like aiming instead of twisting around the stomach.

#### What Was Attempted

- removed the spine-chain twist component from the additive aim pass
- changed the upper-body aim motion to pitch-only bending
- extended the additive chain slightly to include:
  - `mixamorigNeck`
  - `mixamorigHead`
- kept neck/head influence smaller than the spine chain

#### Result

- the runtime aim test should now behave more like a forward/backward upper-body bend
- stomach twist is no longer part of the additive aim logic

#### Carry Forward

- if the bend direction is still wrong, the next pass should flip the pitch sign
- if the bend is too local, spine weights should be redistributed rather than reintroducing twist

### 2026-05-18 - Reverted To Stable 13-Step Runtime Variant Switching

#### Objective

Return to the last visually stable aiming setup after the single-rig override and additive upper-body experiments failed to match the intended pose quality.

#### What Was Attempted

- removed the single-rig runtime aiming path
- removed the additive upper-body spine bend test
- restored the multi-variant runtime setup using the 13 exported angle files:
  - `0`
  - `9`
  - `17`
  - `25`
  - `33`
  - `41`
  - `50`
  - `58`
  - `66`
  - `75`
  - `83`
  - `91`
  - `100`
- kept the previously approved interaction rule:
  - draw stays normal from `0.32` up to near `0.58`
  - vertical aiming activates near `0.58`
  - nearest real angle step is shown

#### Result

- runtime behavior is back on the known-stable 13-step approach
- aiming quality is again based on the original Mixamo pose variants rather than live rig overrides

#### Carry Forward

- this is the current safe baseline for further mini-game testing
- any future single-file attempt should be treated as a separate experiment, not as an in-place replacement of the stable ladder

### 2026-05-18 - Imported No-Skin 58 Export For Asset-Pipeline Comparison

#### Objective

Measure how much weight comes from mesh/skin duplication by comparing a no-skin Mixamo export against the current full 58-angle file.

#### What Was Attempted

- imported desktop file:
  - `C:\Users\LOQ\Desktop\Shooting Arrow58x.fbx`
- stored it in the repo as:
  - `public/models/shooting-arrow-58-noskin-test.fbx`
- compared its raw file size against the existing skinned `58` export

#### Result

- current skinned `58` file:
  - `shooting-arrow-58-test.fbx`
  - about `2.25 MB`
- new no-skin `58` file:
  - `shooting-arrow-58-noskin-test.fbx`
  - about `0.62 MB`

#### Carry Forward

- this strongly suggests most of the current 13-step weight comes from repeated mesh/skin payload, not only animation data
- next review can check whether no-skin exports still contain the runtime animation data we need

### 2026-05-18 - Replaced Live 58 Step With No-Skin Export

#### Objective

See what actually happens in the live 13-step runtime when one angle step uses a no-skin export instead of the original skinned FBX.

#### What Was Attempted

- replaced the active `58` ladder entry path:
  - from `shooting-arrow-58-test.fbx`
  - to `shooting-arrow-58-noskin-test.fbx`

#### Result

- the current runtime now uses the no-skin asset specifically when the `58` step becomes the nearest selected angle

#### Carry Forward

- this test should reveal whether the no-skin export is usable directly as a visible runtime variant or only as animation/reference data

### 2026-05-18 - Restored Skinned 58 Step After No-Skin Visibility Test

#### Objective

Return the live 13-step runtime to a fully visible state after confirming that the no-skin `58` export cannot act as a display variant by itself.

#### What Was Attempted

- reverted the live `58` ladder entry path:
  - from `shooting-arrow-58-noskin-test.fbx`
  - back to `shooting-arrow-58-test.fbx`

#### Result

- the active 13-step runtime is again fully skinned across all displayed steps
- the no-skin `58` file remains available only as an asset-pipeline test/reference file

#### Carry Forward

- next useful experiment is no longer “show no-skin directly”
- next useful experiment is:
  - keep one skinned visible file
  - try driving it with animation data from a no-skin export

### 2026-05-18 - Testing 58 No-Skin Clip On Top Of 50 Skinned Mesh

#### Objective

Check whether a no-skin Mixamo export can be used as an animation source while the visible mesh comes from a separate skinned base file.

#### What Was Attempted

- kept the live `50` step as:
  - skinned display file
  - skinned clip source
- changed the live `58` step to:
  - display mesh from `shooting-arrow-test-v1.fbx`
  - animation clip from `shooting-arrow-58-noskin-test.fbx`
- left all other angle steps unchanged

#### Result

- the runtime is now set up to reveal whether the `58` no-skin clip can drive a visible skinned mesh from the `50` file

#### Carry Forward

- if this works, the next scale-up path is:
  - one skinned base
  - many no-skin clip sources
- if it fails, the no-skin exports are not compatible enough with the visible skinned base for this runtime approach

### 2026-05-18 - Extended No-Skin Clip-On-Skinned-Mesh Test To 66 And 75

#### Objective

Check whether the successful or failed behavior at `58` also holds for two higher angle steps instead of trusting a single-point result.

#### What Was Attempted

- imported:
  - `public/models/shooting-arrow-66-noskin-test.fbx`
  - `public/models/shooting-arrow-75-noskin-test.fbx`
- observed raw sizes:
  - `66-noskin` about `0.63 MB`
  - `75-noskin` about `0.64 MB`
- changed the live `66` step to:
  - display mesh from `shooting-arrow-test-v1.fbx`
  - animation clip from `shooting-arrow-66-noskin-test.fbx`
- changed the live `75` step to:
  - display mesh from `shooting-arrow-test-v1.fbx`
  - animation clip from `shooting-arrow-75-noskin-test.fbx`

#### Result

- the live runtime is now testing the clip-on-base-mesh strategy across:
  - `58`
  - `66`
  - `75`

#### Carry Forward

- if all three behave correctly, the one-skinned-plus-many-no-skin direction becomes much more credible
- if only one works, compatibility must be evaluated per export rather than assumed globally

### 2026-05-18 - Added Active Step Readout To Debug Overlay

#### Objective

Make it obvious during testing which angle step is currently active instead of inferring it from `aim` values by hand.

#### What Was Attempted

- added a direct `step` readout to the existing top-left debug overlay
- kept the step calculation aligned with the same nearest-angle selection logic used by runtime rendering

#### Result

- testers can now see whether the current visible pose is:
  - `50`
  - `58`
  - `66`
  - `75`
  - or any other ladder step

#### Carry Forward

- this should make no-skin compatibility checks much faster and less ambiguous

### 2026-05-18 - Switched Page To Single 50 Trim24 Skinned File Only

#### Objective

Inspect the new trimmed `50` base export directly on the page without any other angle-step variants interfering with the test.

#### What Was Attempted

- imported desktop file:
  - `C:\Users\LOQ\Desktop\Shooting Arrow50.fbx`
- renamed it in-project to:
  - `public/models/shooting-arrow-50-trim24-skin-test.fbx`
- verified size:
  - about `2.11 MB`
- removed the live 13-step runtime ladder from the page for this pass
- switched the page canvas to this single file only
- remapped the interaction window to the trimmed clip:
  - start `0`
  - draw end about `0.40625`
  - release end `1`

#### Result

- the page is now showing only the new `50` trimmed 24fps skinned file
- all other angle variants are temporarily out of the live page runtime for this inspection pass

#### Carry Forward

- this pass is only for validating the trimmed skinned base file quality
- angle-step logic can be reintroduced afterward on top of the validated base asset

### 2026-05-18 - Added 25 33 41 Trim24 No-Skin Steps On Top Of 50 Skinned Base

#### Objective

Test a smaller low-angle ladder using the trimmed 24fps no-skin exports while keeping the visible mesh fixed on the trimmed `50` skinned base.

#### What Was Attempted

- imported desktop files:
  - `Shooting Arrow25.fbx`
  - `Shooting Arrow33.fbx`
  - `Shooting Arrow41.fbx`
- renamed them in-project to:
  - `public/models/shooting-arrow-25-trim24-noskin-test.fbx`
  - `public/models/shooting-arrow-33-trim24-noskin-test.fbx`
  - `public/models/shooting-arrow-41-trim24-noskin-test.fbx`
- observed raw sizes:
  - `25` about `0.49 MB`
  - `33` about `0.468 MB`
  - `41` about `0.451 MB`
- restored a small runtime ladder on the page with these four steps:
  - `25`
  - `33`
  - `41`
  - `50`
- kept the visible mesh fixed on:
  - `shooting-arrow-50-trim24-skin-test.fbx`
- used the no-skin files only as clip sources for:
  - `25`
  - `33`
  - `41`

#### Result

- the page now tests a trimmed/24fps low-angle ladder driven by one skinned base plus three no-skin clips

#### Carry Forward

- this pass should confirm whether the trimmed no-skin pipeline still behaves correctly at lower steps, not only around `58/66/75`

### 2026-05-18 - Isolating 25 Step To Distinguish Mapping Error From Optimized Clip Issue

#### Objective

Find out whether the bad low-angle behavior comes from the runtime step mapping or from the new trimmed/24fps/no-skin export itself.

#### What Was Attempted

- temporarily removed the optimized no-skin setup from the live `25` step
- restored `25` to its original skinned source:
  - display mesh from `shooting-arrow-down-test.fbx`
  - clip source from `shooting-arrow-down-test.fbx`
- left `33` and `41` on the trimmed no-skin-on-50-base setup

#### Result

- the current page can now be used to compare:
  - `25` on original skinned data
  - `33` and `41` on optimized no-skin clip data

#### Carry Forward

- if `25` now looks correct while `33/41` still look wrong, the problem is in the optimized export path rather than the runtime step-selection logic

### 2026-05-18 - Replaced 25 33 41 Low-Angle Clips With Non-Reduced Exports

#### Objective

Remove `Non-Uniform` keyframe reduction from the low-angle test files after the `25` isolate pass showed the reduced export path was the likely source of the bad aiming pose.

#### What Was Attempted

- imported new desktop files:
  - `Shooting Arrow25x.fbx`
  - `Shooting Arrow33x.fbx`
  - `Shooting Arrow41x.fbx`
- replaced the in-project low-angle no-skin files with these new exports:
  - `shooting-arrow-25-trim24-noskin-test.fbx`
  - `shooting-arrow-33-trim24-noskin-test.fbx`
  - `shooting-arrow-41-trim24-noskin-test.fbx`
- observed all three at about:
  - `0.487 MB`
- restored the intended runtime pattern for all three low-angle steps:
  - display mesh from `shooting-arrow-50-trim24-skin-test.fbx`
  - clip source from the corresponding no-skin file

#### Result

- the low-angle ladder is again consistently running on the one-skinned-plus-many-no-skin model
- the reduced-keyframe variant is no longer part of the live low-angle test

#### Carry Forward

- current conclusion:
  - `Non-Uniform` was too aggressive for these low-angle steps
- next review should verify whether the new `25/33/41` plain trimmed 24fps no-skin files now sit correctly on the `50` skinned base

### 2026-05-18 - Switched Repo To Optimized 25 33 41 50 58 66 75 Asset Set Only

#### Objective

Move the repo off the old mixed test assets and keep only the current optimized trim24 set in `public/models`.

#### What Was Attempted

- imported new desktop files:
  - `Shooting Arrow58x.fbx`
  - `Shooting Arrow66x.fbx`
  - `Shooting Arrow75x.fbx`
- renamed them in-project to:
  - `public/models/shooting-arrow-58-trim24-noskin-test.fbx`
  - `public/models/shooting-arrow-66-trim24-noskin-test.fbx`
  - `public/models/shooting-arrow-75-trim24-noskin-test.fbx`
- expanded the live ladder to:
  - `25`
  - `33`
  - `41`
  - `50`
  - `58`
  - `66`
  - `75`
- kept the visible mesh fixed on:
  - `shooting-arrow-50-trim24-skin-test.fbx`
- removed all other old `shooting-arrow*.fbx` files from `public/models`

#### Result

- the repo now keeps only these active optimized mini-game character assets:
  - `shooting-arrow-25-trim24-noskin-test.fbx`
  - `shooting-arrow-33-trim24-noskin-test.fbx`
  - `shooting-arrow-41-trim24-noskin-test.fbx`
  - `shooting-arrow-50-trim24-skin-test.fbx`
  - `shooting-arrow-58-trim24-noskin-test.fbx`
  - `shooting-arrow-66-trim24-noskin-test.fbx`
  - `shooting-arrow-75-trim24-noskin-test.fbx`

#### Carry Forward

- this is the current optimized asset baseline for the landing-page mini-game test
- next review should confirm:
  - whether `58/66/75` sit correctly on the `50` skinned base
  - whether the `25..75` ladder is enough or still needs one extra middle step

### 2026-05-18 - Softened Runtime Step Switching With Smoothed Angle Input

#### Objective

Reduce the harsh snap between angle steps without going back to unsafe pose blending or multi-mesh opacity tricks.

#### What Was Attempted

- kept the optimized `25..75` ladder structure unchanged
- added a short runtime smoothing pass before nearest-step selection
- changed the visible-step logic so that:
  - raw target angle is still computed from drag input
  - displayed step follows a damped angle signal instead of the raw instantaneous value

#### Result

- step switching should now feel less jumpy and less twitchy under small mouse movement changes
- the system is still step-based; this is a softening pass, not full pose interpolation

#### Carry Forward

- if this feels better, the current approach can remain step-based
- if it still feels too jumpy, the next improvement should be:
  - mild hysteresis between neighboring steps
  - not mesh crossfade

### 2026-05-19 - Added Runtime Bow And Arrow Mount Test

#### Objective

Move the mini-game closer to a real archery setup by mounting separate bow and arrow assets onto the current runtime character instead of relying only on the baked character animation.

#### Test Setup

- runtime component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- imported desktop assets:
  - `public/models/bow.obj`
  - `public/models/arrow.obj`
- active character ladder:
  - `25 / 33 / 41 / 50 / 58 / 66 / 75`
- visible skinned base:
  - `public/models/shooting-arrow-50-trim24-skin-test.fbx`

#### What Was Attempted

- attached the bow to `mixamorigLeftHand`
- attached the arrow to the right-hand side of the rig
- added temporary runtime materials because the imported `OBJ` assets did not bring usable project-side materials with them
- tuned bow position and orientation by direct visual iteration
- corrected the bow orientation so the string-facing side points toward the character

#### Result

- the current mini-game prototype now has separate runtime bow and arrow assets in the scene
- the bow is visually seated in the left hand closely enough for continued aiming tests
- the setup is usable for continuing arrow alignment, release, and projectile tests

#### Problems Found

- the imported `OBJ` bow references external material data that is not yet part of the project
- the test bow still uses a temporary code-side material instead of production asset shading
- a fixed arrow transform on the right hand drifted visibly across different angle steps

#### Carry Forward

- keep bow and arrow as separate runtime attachments rather than baking them into the character FBX
- the current `OBJ` assets are good enough for placement tests only
- the production pipeline should still move to optimized `GLB` assets

### 2026-05-19 - Reworked Hand Arrow To Tail-Pivot Alignment With 50 Baseline

#### Objective

Stop the arrow tail from sliding around during angle changes and create a more reliable way to tune arrow alignment against the bow.

#### Test Setup

- runtime component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- active angle steps:
  - `25 / 33 / 41 / 50 / 58 / 66 / 75`
- approved comparison pose:
  - `50`
- debug overlay values:
  - `target`
  - `visible`
  - `tip dY`
  - `tip dZ`
  - `tail gap`

#### What Was Attempted

- replaced the old whole-arrow hand offset model with a tail-pivot setup on the right hand
- anchored the tail of the arrow to the hand-side pinch zone while letting the head move through pivot rotation
- added runtime metrics that compare the current arrow tip against the `50` baseline in bow-local space
- used `50` as the approved visual reference and tuned `58` against it numerically instead of only by eye
- kept the `58` fix limited to rotation after the tail anchor was approved across angles

#### Result

- the arrow tail now stays stable enough across the current angle ladder for continued testing
- `50` is now an explicit baseline rather than an informal visual reference
- `58` has been tuned until it visually matches `50` closely in the current pass
- the debug overlay now makes it much easier to distinguish:
  - wrong visible step
  - head misalignment relative to the bow
  - tail drift away from the thumb/index pinch zone

#### Problems Found

- moving the whole arrow by hand transform was not robust enough once different no-skin clip variants were involved
- trying to solve both tail and head with one position offset created repeated regressions
- some early rotation tests were misleading until the tail-pivot logic was in place and the visible-step debug values were exposed

#### Carry Forward

- treat `50` as the approved arrow-on-bow baseline for future angle-step corrections
- keep tail anchoring separate from head alignment
- for future step tuning:
  - do not move the whole arrow first
  - lock the tail
  - then solve the head by rotation
- keep `tip dY`, `tip dZ`, and `tail gap` in the debug overlay while the ladder is still being tuned

### 2026-05-19 - Added Projectile Arrow Spawn On Release

#### Objective

Make release feel more like a shot by separating a projectile arrow from the hand arrow at release time.

#### Test Setup

- runtime component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- release source:
  - current hand-arrow world transform at release time

#### What Was Attempted

- sampled the hand arrow world position, world quaternion, and world scale at release
- hid the hand arrow during active flight
- spawned a separate projectile arrow with a lightweight forward-flight and gravity pass
- slowed the post-release animation section so the release motion feels less abrupt

#### Result

- release now spawns a separate projectile arrow instead of only resetting the hand pose
- the projectile uses the correct runtime scale instead of popping in at raw source size
- the current release pass is now good enough for continued hit/target testing later

#### Problems Found

- the first projectile pass exposed a large-scale mismatch because the world scale from the hand arrow was not being carried over
- the current projectile is still a simple flight pass and does not yet handle target hit, stick, or reaction behavior

#### Carry Forward

- any future projectile work should keep sampling from the hand arrow at release instead of inventing a separate launch transform
- target hit logic should build on top of the current projectile pass, not replace it with a disconnected system

### 2026-05-20 - Locked Arrow-On-Bow Placement Method

#### Objective

Capture the now-validated runtime method for placing the arrow on the bow so future tuning work does not fall back to the earlier unstable approaches.

#### Test Setup

- runtime component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- active ladder:
  - `25 / 33 / 41 / 50 / 58 / 66 / 75`
- baseline pose:
  - `50`
- active debug values:
  - `tip dY`
  - `tip dZ`
  - `tail gap`

#### What Was Learned

- the arrow should not be aligned by moving the whole arrow mesh around by hand for each step
- the tail must stay anchored first
- the correct runtime setup is:
  - attach an `arrowPivot` to the right hand
  - place the arrow mesh inside that pivot so the tail sits on the pivot origin
  - keep the tail fixed in the thumb/index pinch zone
  - solve head placement by changing per-step rotation only
- `50` works as the approved visual and numeric baseline
- the debug overlay is useful because it separates:
  - tail drift from the hand
  - head drift relative to the bow
  - wrong visible step selection

#### Result

- the team now has a repeatable way to place the arrow on the bow without rebreaking the tail position
- `58`, `66`, and `75` were tuned using this method instead of the older whole-arrow offset guessing
- the runtime alignment work is now on a clearer path for the remaining steps

#### Problems Found

- changing full arrow position caused repeated regressions because it moved both tail and head together
- early angle tuning felt inconsistent until the tail-pivot model and `50` baseline comparison were both in place
- axis intuition was not reliable enough by eye alone; the debug metrics were needed

#### Carry Forward

- for all future arrow-on-bow tuning:
  - do not start by moving the whole arrow
  - lock the tail first
  - use `50` as baseline
  - solve the head by rotation
- keep the `tip dY`, `tip dZ`, and `tail gap` overlay until all angle steps are approved
- once the current `OBJ` test assets are replaced with production `GLB` assets, preserve the same tail-pivot and baseline-driven alignment strategy

### 2026-05-20 - Aligned Target Placement To Real Shot Trajectories

#### Objective

Stop treating the target as only a framed scene prop and place it where the runtime shots from the current character rig actually travel.

#### Test Setup

- runtime component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- target asset:
  - `public/models/target.obj`
- sampled shot review:
  - `50`
  - `58`
  - `66`
  - `75`

#### What Was Learned

- placing the target only by eye inside the visible frame was not enough
- the live shot paths for `50 / 58 / 66` were crossing the target plane around a much higher `z` value than the original target placement
- this is why one angle could appear to work while neighboring angles still passed through visually
- the reliable method is:
  - sample the real launch direction from the runtime rig
  - inspect where the arrow tip crosses the target plane
  - move the target to the real trajectory cluster instead of keeping an arbitrary scene-center placement

#### Result

- the target position is now aligned to the actual mid-range shot bundle rather than a guessed staging point
- `50`, `58`, and `66` now share a much more credible target lane

#### Problems Found

- visual framing alone was misleading for target placement
- a simple center-distance hit test hid the real issue by making one angle look valid while others still missed

#### Carry Forward

- if future bow/arrow changes alter the release trajectory, re-sample the real shot paths before moving the target by eye
- keep target placement tied to shot data, not only to composition preferences

### 2026-05-20 - Switched Target Hit Detection To Front-Face Tip Crossing

#### Objective

Make target collisions match what the player sees instead of depending on a coarse center-radius approximation.

#### Test Setup

- runtime component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- projectile source:
  - sampled runtime hand-arrow transform on release
- collision reference:
  - front face of the target

#### What Was Attempted

- stopped checking hit only from a simple projectile-origin distance to the target center
- switched the collision test to the arrow tip
- checked the segment between previous-frame and current-frame arrow-tip positions
- measured the tip crossing against the target front plane and target face radius
- kept a stuck arrow on impact and added a short wobble reaction to the target

#### Result

- target hits are now based on the visible leading point of the arrow instead of the model origin
- a successful hit now feels more readable because:
  - the arrow remains in the target
  - the target reacts briefly

#### Problems Found

- checking only the projectile origin was too coarse for the current arrow model and caused visible pass-through cases
- checking the target center alone was not enough once neighboring angle trajectories diverged

#### Carry Forward

- keep collision checks tied to the arrow tip, not the arrow root
- if hit behavior is refined later, preserve the current front-face crossing logic as the base collision rule

### 2026-05-20 - Added Live Shot Preview Trace

#### Objective

Show the player where the current shot is expected to travel and hit before release.

#### Test Setup

- runtime component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- preview source:
  - current live hand-arrow sample from the visible rig
- preview rules:
  - same launch offset as the real shot
  - same projectile speed
  - same gravity
  - same target front-face hit logic

#### What Was Attempted

- sampled the active hand-arrow direction and position while aiming
- built a short forward simulation inside the canvas
- rendered a visible preview line for the expected shot path
- added a marker at the predicted impact point when the simulated path intersects the target

#### Result

- the mini-game now shows a live trace of the upcoming shot while the bow is drawn
- the player can see the likely impact point before release instead of inferring it only from pose

#### Problems Found

- a preview line is only useful if it matches the real shot logic
- using a decorative or simplified preview path would become misleading once target placement and hit logic were corrected

#### Carry Forward

- keep the shot preview tied to the same runtime values as the real projectile
- if shot speed, gravity, or hit logic changes later, update the preview with the same rules in the same task

### 2026-05-20 - Smoothed Flight Rotation And Connected Hit Success To Asset Selection

#### Objective

Improve the feel of arrow flight after release and turn a successful hit into a real flow transition instead of a dead-end prototype loop.

#### Test Setup

- runtime component:
  - `src/features/calculator/components/mini-game/MiniGameCharacterTestCanvas.tsx`
- market source:
  - `src/features/calculator/components/MarketSelectionSidebar.tsx`
- destination route:
  - `src/app/asset-selection/page.tsx`

#### What Was Attempted

- changed projectile orientation from an always-frozen release quaternion to a smoothed follow of live velocity
- softened the target wobble with a longer, less abrupt decay and a small yaw component
- lifted market selection state out of the sidebar so the mini-game can see the current market
- pushed successful hits to `asset-selection` after a short delay so the target reaction remains visible
- passed the selected market into `asset-selection` via the URL and used it in the route/page copy instead of keeping `Crypto` hardcoded there

#### Result

- arrow flight now feels less rigid because the projectile turns with its travel direction during the arc
- the target reaction has a more readable follow-through
- a successful hit now advances into the next calculator step instead of only ending the shot locally
- the selected market now survives the transition into the asset-selection step

#### Problems Found

- keeping market selection local to the sidebar blocked the hit-success flow from carrying meaningful state forward
- freezing projectile orientation at release made the arrow feel visually wrong once gravity started bending the path

#### Carry Forward

- keep projectile orientation tied to velocity rather than the raw release pose
- if the asset-selection step grows more dynamic later, continue passing the chosen market deliberately rather than relying on default static content

### 2026-05-21 - Validated Single-Rig Angle Control With Full Pose Sheet

#### Objective

Find out whether the mini-game could leave the seven-file live ladder behind and still change aim angle on one skinned character file.

#### Test Setup

- active skinned base:
  - `public/models/shooting-arrow-50-trim24-skin-test.fbx`
- comparison source files:
  - `shooting-arrow-25-trim24-noskin-test.fbx`
  - `shooting-arrow-33-trim24-noskin-test.fbx`
  - `shooting-arrow-41-trim24-noskin-test.fbx`
  - `shooting-arrow-58-trim24-noskin-test.fbx`
  - `shooting-arrow-66-trim24-noskin-test.fbx`
  - `shooting-arrow-75-trim24-noskin-test.fbx`
- fixed comparison moment:
  - `clipProgress = 0.40625`
- generated pose sheet:
  - `docs/mini-game/full-draw-bone-dump.json`

#### What Was Attempted

- narrowed the comparison to the exact `fully drawn` moment instead of trying to infer rules from the whole clip
- generated a complete bone dump for that moment across:
  - `25`
  - `33`
  - `41`
  - `50`
  - `58`
  - `66`
  - `75`
- first tried a conservative single-rig controller that only changed a subset of upper-body bones
- observed repeated twisting, body drift, and unstable stance even after:
  - limiting aim activation to full draw
  - removing smoothing
  - snapping to discrete angle steps
  - reintroducing lower-body bones
- then replaced the partial controller with a full pose application driven directly by the dump data
- narrowed the live proof pass to:
  - `50`
  - `58`
  - to isolate whether the method itself worked before expanding again

#### Result

- the single-rig angle test worked once the full pose state was applied
- this proved that the earlier failures were caused by missing pose elements, not by the one-file approach itself
- the important lesson is:
  - partial pose reconstruction was not enough
  - full-body pose state at the chosen full-draw snapshot was needed
- the project now has a concrete internal reference file for future angle work:
  - `docs/mini-game/full-draw-bone-dump.json`

#### Problems Found

- changing only selected bones caused the character to twist or lose body balance
- limiting the controller to upper body plus a few helpers was still not enough
- the previous assumption that a small hand-picked subset of bones could reproduce the angle ladder was wrong for this rig
- root and full-body compensation inside the source poses mattered more than expected

#### Carry Forward

- future single-rig angle work should start from a full pose sheet, not from guessed bone subsets
- when testing new angle logic, use the fixed full-draw snapshot first:
  - `clipProgress = 0.40625`
- if the controller is expanded from `50` and `58` back to the full ladder, it should reuse the same pose-sheet-driven method
- keep `full-draw-bone-dump.json` as the source of truth for this experiment history even if the final production controller is refactored later

### 2026-05-21 - Expanded Single-Rig Controller To Full 25-75 Angle Range

#### Objective

Confirm that the single-rig pose-sheet controller still works when expanded from the first successful narrow pass to the full approved angle ladder.

#### Test Setup

- active skinned runtime file:
  - `public/models/shooting-arrow-50-trim24-skin-test.fbx`
- pose-sheet source:
  - `docs/mini-game/full-draw-bone-dump.json`
- fixed reference moment:
  - `clipProgress = 0.40625`
- active anchor angles:
  - `25`
  - `33`
  - `41`
  - `50`
  - `58`
  - `66`
  - `75`

#### What Was Attempted

- kept the single-rig runtime on the `50` skinned base
- kept the full-body pose-sheet method that had already proven stable in the `50 -> 58` test
- added the remaining anchors back into the controller
- changed interpolation to work segment-by-segment between neighboring anchors instead of one long blend across the whole range
- re-enabled the full `25..75` aim range after the narrow-range validation succeeded

#### Result

- the full active angle ladder now works on a single rig
- smooth angle change across:
  - `25 -> 33`
  - `33 -> 41`
  - `41 -> 50`
  - `50 -> 58`
  - `58 -> 66`
  - `66 -> 75`
  is now stable in the current pass
- the earlier runtime ladder based on switching live angle files is no longer the only validated architecture
- the controller, pose sheet, and single-rig approach are now proven across the full target angle range

#### Problems Found

- blending across large ranges should still be treated as neighboring segments, not one direct long-range interpolation
- a partial-bone controller was not enough even though the full-pose-sheet controller was

#### Carry Forward

- keep the single-rig controller data-driven from the pose sheet
- keep interpolation segment-based between neighboring anchors
- if future gaps appear, add new anchor poses only where needed instead of multiplying live runtime files
- treat the current full-sheet single-rig controller as the new baseline for future mini-game improvements

### 2026-05-21 - Narrowed Runtime Aim Range And Trimmed Pose Sheet

#### Objective

Reduce the active mini-game pose payload after the direct `25 -> 50 -> 75` runtime range was kept and judged stable enough without the smaller intermediate steps.

#### Test Setup

- runtime target range:
  - `25 -> 50 -> 75`
- retained pose anchors for the live controller:
  - `25`
  - `50`
  - `75`
- trimmed active pose-sheet file:
  - `docs/mini-game/full-draw-bone-dump.json`

#### What Was Attempted

- stopped keeping the intermediate active anchor steps:
  - `33`
  - `41`
  - `58`
  - `66`
- kept the runtime centered on the same `50` baseline
- narrowed the live target angle mapping to the reduced range around that baseline
- trimmed the pose-sheet payload to the anchor data still consumed by runtime
- removed pose-sheet fields that the live controller was no longer reading

#### Result

- the live single-rig controller now runs on the reduced direct range:
  - `25 -> 50 -> 75`
- the active pose-sheet payload is smaller and simpler
- the runtime no longer carries the full seven-step proof sheet as active data

#### Problems Found

- no new visible issue was accepted in the manual pass that motivated this trim

#### Carry Forward

- keep the reduced runtime sheet lean unless a visible regression appears
- if we need more angle fidelity later, add only the missing anchors that solve a real visual problem
- keep the distinction clear between:
  - the full proof history
  - and the smaller live runtime payload

### 2026-05-21 - Extended Upper Aim Range To 100

#### Objective

Expand the live upper aiming range beyond `75` so the controller can use a real `100` pose instead of only stretching the old top range numerically.

#### Test Setup

- new source file:
  - `C:\Users\LOQ\Desktop\Shooting Arrow100.fbx`
- imported runtime reference:
  - `public/models/shooting-arrow-100-trim24-noskin-test.fbx`
- extraction snapshot:
  - `clipProgress = 0.40625`
- updated pose-sheet file:
  - `docs/mini-game/full-draw-bone-dump.json`

#### What Was Attempted

- imported the new `100` no-skin FBX into the repo
- sampled the same full-draw snapshot already used by the pose-sheet controller
- appended `100` bone position and quaternion data to the trimmed pose sheet
- expanded the live controller anchor ladder from:
  - `25 / 50 / 75`
- to:
  - `25 / 50 / 75 / 100`
- changed the active runtime target range from:
  - `25 -> 50 -> 75`
- to:
  - `25 -> 50 -> 100`

#### Result

- the live upper aim range now reaches a real `100` pose
- the controller no longer has to fake the upper extension by clamping on `75`
- the trimmed pose sheet now keeps only the anchors currently consumed by runtime:
  - `25 / 50 / 75 / 100`

#### Carry Forward

- keep the runtime mapping centered on the `50` baseline even though the upper half is now wider than the lower half
- if the `75 -> 100` blend shows a visible gap later, add only the missing upper anchor instead of restoring the full older ladder

## Next Test Template

Copy this block for each future pass:

```md
### YYYY-MM-DD - Short Test Name

#### Objective

#### Test Setup

- assets:
- route or sandbox:
- interaction being tested:

#### What Was Attempted

- 

#### Result

- 

#### Problems Found

- 

#### Carry Forward

- 
```
