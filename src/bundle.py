import os

file_list = ['global.js',
             'cursor.js',
             'line_buf.js',
             'page.js',
             'document.js',
             'blocks/simple.js',
             'blocks/section.js',
             'blocks/paragraph.js',
             'blocks/jump.js',
             'blocks/font_style/bf.js',
             'blocks/font_style/center.js',
             'blocks/font_style/crlf.js',
             'blocks/font_style/font_size.js',
             'blocks/font_style/it.js',
             'blocks/geek_alphabet/alpha.js',
             'blocks/geek_alphabet/beta.js',
             'blocks/geek_alphabet/chi.js',
             'blocks/geek_alphabet/delta.js',
             'blocks/geek_alphabet/epsilon.js',
             'blocks/geek_alphabet/eta.js',
             'blocks/geek_alphabet/gamma.js',
             'blocks/geek_alphabet/iota.js',
             'blocks/geek_alphabet/kappa.js',
             'blocks/geek_alphabet/lambda.js',
             'blocks/geek_alphabet/mu.js',
             'blocks/geek_alphabet/nu.js',
             'blocks/geek_alphabet/omega.js',
             'blocks/geek_alphabet/phi.js',
             'blocks/geek_alphabet/pi.js',
             'blocks/geek_alphabet/psi.js',
             'blocks/geek_alphabet/rho.js',
             'blocks/geek_alphabet/sigma.js',
             'blocks/geek_alphabet/tau.js',
             'blocks/geek_alphabet/theta.js',
             'blocks/geek_alphabet/upsilon.js',
             'blocks/geek_alphabet/xi.js',
             'blocks/geek_alphabet/zeta.js',
             'blocks/math/dots.js',
             'blocks/math/frac.js',
             'blocks/math/infty.js',
             'blocks/math/lim.js',
             'blocks/math/operators/bigoperator.js',
             'blocks/math/operators/binaryoperator.js',
             'blocks/math/sqrt.js',
             'blocks/math/to.js']

result = ''
for file_name in file_list:
    f = open(file_name, 'r')
    lines = f.readlines()
    for line in lines:
        is_spacing = False
        for chr in line.replace('\n', '').replace('\r', ''):
            if chr == ' ' and is_spacing == True:
                continue
            if chr == ' ':
                is_spacing = True
            else:
                is_spacing = False
            result = result + chr
            
print result
