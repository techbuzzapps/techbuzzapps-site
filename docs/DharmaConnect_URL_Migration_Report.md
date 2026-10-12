# DharmaConnect URL Migration Report

## Changed files

- Added the Privacy, Terms, Support and Delete Account pages under `apps/dharmaconnect/`, preserving the existing page copy and procedures while adding the shared TechBuzzApps header/footer, canonical metadata and app navigation.
- Replaced the four old legal/support page files with static redirects to their new routes. Each redirect includes a production canonical URL and an accessible fallback link.
- Updated DharmaConnect navigation destinations in `components/navbar.html`, its active-section path in the shared header/footer, and the four legal/support links on the Apps listing.

## Validation

- Confirmed the five new DharmaConnect routes and all four legacy routes return HTTP 200 from the local server.
- Verified each legacy page contains its matching meta-refresh target, canonical URL and fallback link.
- Checked site-relative navigation and internal links against existing routes and assets; no unresolved paths were found.
- Searched website HTML and shared components for old legal/support links and localhost/development-server URLs; none remain outside redirect destinations.
- `git diff --check` passed.
