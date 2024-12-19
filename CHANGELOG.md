# Changelog

## 1.6.2 – _2024-12-19_
### Fixed
- Further increase Project dropdown timeout to prevent the wrong option from being selected

## 1.6.1 – _2024-12-18_
### Fixed
- Project dropdown should no longer be able to show an empty selection with the wrong options

## 1.6.0 – _2024-12-12_
### Added
- Add support for templates
  - Tip: If you want a template you can edit daily (e.g. same activity but different hours spent) - simply save and "+Add" it, then edit the new activity entry (by clicking the name of the activity in the table)
  - Tip: If you want a turn an existing activity entry into a template - simply edit the existing activity entry (by clicking the name of the activity in the table) then hit "Save as Template" (then "Save" again to exit Edit mode)

- New keyboard shortcuts:

| Command | Shortcut |
| ------- | -------- |
| Add first saved template | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>1</kbd> |
| Add second saved template | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>2</kbd> |
| etc. | |

### Fixed
- Don't apply defaults if we're editing an existing activity
  - Tip: If you want to "clear" one of your defaults (e.g. "details") just delete the text and save the empty field as your new default
-  The Product, Project, and Activity dropdowns now use this extensions saving method (though they'll also trigger the native ones).
  - Dev Note: I prefer not to overwrite existing functionality when possible, but the native saves seemed to occasionally just not work. (Also note: the first two fields actually save together - since they rely on each other's selection)

### Changed
- Convert time spent to hours when editing an existing activity

## 1.5.7 – _2024-12-11_
### Changed
- Update corporate holidays for 2025

## 1.5.6 – _2023-12-28_
### Changed
- Update corporate holidays for 2024

## 1.5.5 – _2023-06-16_
### Changed
- Add new corporate holiday ("Day Before Independence Day")

## 1.5.4 – _2023-01-03_
### Changed
- Update corporate holidays for 2023

## 1.5.3 – _2022-09-29_
### Changed
- Minor bug fixes

## 1.5.2 – _2022-06-02_
### Changed
- Update summer hours for 2022

## 1.5.1 – _2022-01-24_
### Changed
- Update corporate holidays for 2022

## 1.5.0 – _2021-01-15_
### Added
- "+ Add" Company Holiday button on participating days

## 1.4.0 – _2019-07-01_
### Added
- Delete activity button on Task page

## 1.3.0 – _2019-06-20_
### Added
- "+ Add" Summer Hours button on participating days

## 1.2.0 – _2019-04-21_
### Added
- "Add New" buttons in "week view" on Activity page

### Changed
- Default to "week view" on Activity page

## 1.1.0 – _2018-10-28_
### Added
- New keyboard shortcuts:

| Command | Shortcut |
| ------- | -------- |
| Next business day | <kbd>Ctrl</kbd>+<kbd>⇨</kbd> |
| Previous business day | <kbd>Ctrl</kbd>+<kbd>⇦</kbd> |
| Submit | <kbd>Ctrl</kbd>+<kbd>↵ Enter</kbd> |
