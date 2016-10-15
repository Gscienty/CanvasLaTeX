((root) => {
    'use strict';

    var BuildSimple = root.blocks.simple.Build;

    root.blocks.alpha = {
        Build : (a) => { return BuildSimple('α' + a.substring(6)); },
        Test : (a) => { return /^\\alpha/.test(a); }
    };
    root.blocks.A = {
        Build : (a) => { return BuildSimple('A' + a.substring(2)); },
        Test : (a) => { return /^\\A/.test(a); }
    };

    root.blocks.beta = {
        Build : (a) => { return BuildSimple('β' + a.substring(5)); },
        Test : (a) => { return /^\\beta/.test(a); }
    };
    root.blocks.B = {
        Build : (a) => { return BuildSimple('B' + a.simple(2)); },
        Test : (a) => { return /^\\B/.test(a); }
    };

    root.blocks.chi = {
        Build : (a) => { return BuildSimple('χ' + a.substring(4)); },
        Test : (a) => { return /^\\chi/.test(a); }
    };
    root.blocks.Chi = {
        Build : (a) => { return BuildSimple('X' + a.substring(4)); },
        Test : (a) => { return /^\\Chi/.test(a); }
    };

    root.blocks.delta = {
        Build : (a) => { return BuildSimple('δ' + a.substring(6)); },
        Test : (a) => { return /^\\delta/.test(a); }
    };
    root.blocks.Delta = {
        Build : (a) => { return BuildSimple('Δ' + a.substring(6)); },
        Test : (a) => { return /^\\Delta/.test(a); }
    };

    root.blocks.epsilon = {
        Build : (a) => { return BuildSimple('ε' + a.substring(8)); },
        Test : (a) => { return /^\\epsilon/.test(a); }
    };
    root.blocks.Epsilon = {
        Build : (a) => { return BuildSimple('E' + a.substring(8)); },
        Test : (a) => { return /^\\Epsilon/.test(a); }
    };

    root.blocks.eta = {
        Build : (a) => { return BuildSimple('η' + a.substring(4)); },
        Test : (a) => { return /^\\eta/.test(a); }
    };
    root.blocks.Eta = {
        Build : (a) => { return BuildSimple('E' + a.substring(4)); },
        Test : (a) => { return /^\\Eta/.test(a); }
    };

    root.blocks.gamma = {
        Build : (a) => { return BuildSimple('γ' + a.substring(6)); },
        Test : (a) => { return /^\\gamma/.test(a); }
    };
    root.blocks.Gamma = {
        Build : (a) => { return BuildSimple('Γ' + a.substring(6)); },
        Test : (a) => { return /^\\Gamma/.test(a); }
    };

    root.blocks.iota = {
        Build : (a) => { return BuildSimple('ι' + a.substring(5)); },
        Test : (a) => { return /^\\iota/.test(a); }
    };
    root.blocks.Iota = {
        Build : (a) => { return BuildSimple('I' + a.substring(5)); },
        Test : (a) => { return /^\\Iota/.test(a); }
    };

    root.blocks.kappa = {
        Build : (a) => { return BuildSimple('κ' + a.substring(6)); },
        Test : (a) => { return /^\\kappa/.test(a); }
    };
    root.blocks.Kappa = {
        Build : (a) => { return BuildSimple('K' + a.substring(6)); },
        Test : (a) => { return /^\\Kappa/.test(a); }
    };

    root.blocks.lambda = {
        Build : (a) => { return BuildSimple('λ' + a.substring(7)); },
        Test : (a) => { return /^\\lambda/.test(a); }
    };
    root.blocks.Lambda = {
        Build : (a) => { return BuildSimple('∧' + a.substring(7)); },
        Test : (a) => { return /^\\Lambda/.test(a); }
    };

    root.blocks.mu = {
        Build : (a) => { return BuildSimple('μ' + a.substring(3)); },
        Test : (a) => { return /^\\mu/.test(a); }
    };
    root.blocks.Mu = {
        Build : (a) => { return BuildSimple('M' + a.substring(3)); },
        Test : (a) => { return /^\\Mu/.test(a); }
    };

    root.blocks.nu = {
        Build : (a) => { return BuildSimple('ν' + a.substring(3)); },
        Test : (a) => { return /^\\nu/.test(a); }
    };
    root.blocks.Nu = {
        Build : (a) => { return BuildSimple('Ν' + a.substring(3)); },
        Test : (a) => { return /^\\Nu/.test(a); }
    };

    root.blocks.omega = {
        Build : (a) => { return BuildSimple('ω' + a.substring(6)); },
        Test : (a) => { return /^\\omega/.test(a); }
    };
    root.blocks.Omega = {
        Build : (a) => { return BuildSimple('Ω' + a.substring(6)); },
        Test : (a) => { return /^\\Omega/.test(a); }
    };

    root.blocks.phi = {
        Build : (a) => { return BuildSimple('φ' + a.substring(4)); },
        Test : (a) => { return /^\\phi/.test(a); }
    };
    root.blocks.Phi = {
        Build : (a) => { return BuildSimple('Φ' + a.substring(4)); },
        Test : (a) => { return /^\\Phi/.test(a); }
    };

    root.blocks.pi = {
        Build : (a) => { return BuildSimple('π', a.substring(3)); },
        Test : (a) => { return /^\\pi/.test(a); }
    };
    root.blocks.Pi = {
        Build : (a) => { return BuildSimple('∏', a.substring(3)); },
        Test : (a) => { return /^\\Pi/.test(a); }
    };

    root.blocks.psi = {
        Build : (a) => { return BuildSimple('ψ' + a.substring(4)); },
        Test : (a) => { return /^\\psi/.test(a); }
    };
    root.blocks.Psi = {
        Build : (a) => { return BuildSimple('Ψ' + a.substring(4)); },
        Test : (a) => { return /^\\Psi/.test(a); }
    };

    root.blocks.rho = {
        Build : (a) => { return BuildSimple('ρ' + a.substring(4)); },
        Test : (a) => { return /^\\rho/.test(a); }
    };
    root.blocks.Rho = {
        Build : (a) => { return BuildSimple('Ρ' + a.substring(4)); },
        Test : (a) => { return /^\\Rho/.test(a); }
    };

    root.blocks.sigma = {
        Build : (a) => { return BuildSimple('σ' + a.substring(6)); },
        Test : (a) => { return /^\\sigma/.test(a); }
    };
    root.blocks.Sigma = {
        Build : (a) => { return BuildSimple('∑' + a.substring(6)); },
        Test : (a) => { return /^\\Sigma/.test(a); }
    };

    root.blocks.tau = {
        Build : (a) => { return BuildSimple('τ' + a.substring(4)); },
        Test : (a) => { return /^\\tau/.test(a); }
    };
    root.blocks.Tau = {
        Build : (a) => { return BuildSimple('T' + a.substring(4)); },
        Test : (a) => { return /^\\Tau/.test(a); }
    };

    root.blocks.theta = {
        Build : (a) => { return BuildSimple('θ' + a.substring(6)); },
        Test : (a) => { return /^\\theta/.test(a); }
    };
    root.blocks.Theta = {
        Build : (a) => { return BuildSimple('Θ' + a.substring(6)); },
        Test : (a) => { return /^\\Theta/.test(a); }
    };

    root.blocks.upsilon = {
        Build : (a) => { return BuildSimple('υ' + a.substring(8)); },
        Test : (a) => { return /^\\upsilon/.test(a); }
    };
    root.blocks.Upsilon = {
        Build : (a) => { return BuildSimple('Υ' + a.substring(8)); },
        Test : (a) => { return /^\\Upsilon/.test(a); }
    };

    root.blocks.xi = {
        Build : (a) => { return BuildSimple('ξ' + a.substring(3)); },
        Test : (a) => { return /^\\xi/.test(a); }
    };
    root.blocks.Xi = {
        Build : (a) => { return BuildSimple('Ξ' + a.substring(3)); },
        Test : (a) => { return /^\\Xi/.test(a); }
    };

    root.blocks.zeta = {
        Build : (a) => { return BuildSimple('ζ' + a.substring(5)); },
        Test : (a) => { return /^\\zeta/.test(a); }
    };
    root.blocks.Zeta = {
        Build : (a) => { return BuildSimple('Z' + a.substring(5)); },
        Test : (a) => { return /^\\Zeta/.test(a); }
    };
})(this.latex);