import Policy from 'csp-parse';

const defaultPolicyStr =
  'default-src "self" data: gap: https://ssl.gstatic.com "unsafe-eval"; style-src "self" "unsafe-inline"; media-src *; img-src "self" data: content:;';
const existingPolicyEl = document.querySelector<HTMLMetaElement>(
  'meta[http-equiv="Content-Security-Policy"]',
);
const exstingPolicyStr =
  existingPolicyEl && existingPolicyEl.getAttribute('content');
if (existingPolicyEl) existingPolicyEl.remove();

const policyEl = document.createElement('meta');
policyEl.setAttribute('http-equiv', 'Content-Security-Policy');
policyEl.setAttribute('content', exstingPolicyStr || defaultPolicyStr);
const policy = new Policy(policyEl.getAttribute('content') as string);
policy.add('default-src', '*');
policyEl.setAttribute('content', policy.toString());
document.head.appendChild(policyEl);
