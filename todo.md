# TODO

## Style Selector Feature

Add back the style selector dropdown in the AI humanizer text areas (both logged in and logged out versions).

**Requirements:**
- Add "Standard" style option
- Add "My Style" option (premium feature requiring upgrade)
- Add different academic writing styles:
  - Formal Academic
  - Scientific/Technical
  - Essay Style
  - Research Paper
  - Thesis/Dissertation
  - etc.

**Location:**
- `components/AIHumanizerLoggedOut.tsx` - for non-logged in users
- `components/AIHumanizerSection.tsx` - for logged in users

**UI Placement:**
- Bottom left of the text area (in footer section)
- Opens upward (using `bottom-full mb-2` positioning)
- Uses up arrow icon instead of down arrow

**Notes:**
- For non-logged in users, premium styles should show "Upgrade" button
- For logged in free users, premium styles should link to `/pricing`
- Premium styles should be clearly marked as requiring an upgrade
