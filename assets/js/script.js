document.addEventListener("DOMContentLoaded", function () {
  const campoIp = document.querySelector('#ipInput');
  const seletorCidr = document.querySelector('select');
  const botaoVerificar = document.getElementById('botaoVerificar');
  const listaResultados = document.querySelector('.list-group');

  botaoVerificar.addEventListener('click', function () {
      const ipDigitado = campoIp.value;
      const cidrEscolhido = parseInt(seletorCidr.value, 10);

      const padraoIp = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!padraoIp.test(ipDigitado)) {
          alert('Por favor, insira um endereço IP válido.');
          return;
      }

      const partesIp = ipDigitado.split('.').map(Number);
      if (partesIp.some(parte => parte < 0 || parte > 255)) {
          alert('Cada parte do endereço IP deve estar entre 0 e 255.');
          return;
      }

      if (isNaN(cidrEscolhido)) {
          alert('Por favor, selecione uma máscara ou CIDR.');
          return;
      }

      let mascaraSubrede = '';
      switch (cidrEscolhido) {
          case 8: mascaraSubrede = '255.0.0.0'; break;
          case 9: mascaraSubrede = '255.128.0.0'; break;
          case 10: mascaraSubrede = '255.192.0.0'; break;
          case 11: mascaraSubrede = '255.224.0.0'; break;
          case 12: mascaraSubrede = '255.240.0.0'; break;
          case 13: mascaraSubrede = '255.248.0.0'; break;
          case 14: mascaraSubrede = '255.252.0.0'; break;
          case 15: mascaraSubrede = '255.254.0.0'; break;
          case 16: mascaraSubrede = '255.255.0.0'; break;
          case 17: mascaraSubrede = '255.255.128.0'; break;
          case 18: mascaraSubrede = '255.255.192.0'; break;
          case 19: mascaraSubrede = '255.255.224.0'; break;
          case 20: mascaraSubrede = '255.255.240.0'; break;
          case 21: mascaraSubrede = '255.255.248.0'; break;
          case 22: mascaraSubrede = '255.255.252.0'; break;
          case 23: mascaraSubrede = '255.255.254.0'; break;
          case 24: mascaraSubrede = '255.255.255.0'; break;
          case 25: mascaraSubrede = '255.255.255.128'; break;
          case 26: mascaraSubrede = '255.255.255.192'; break;
          case 27: mascaraSubrede = '255.255.255.224'; break;
          case 28: mascaraSubrede = '255.255.255.240'; break;
          case 29: mascaraSubrede = '255.255.255.248'; break;
          case 30: mascaraSubrede = '255.255.255.252'; break;
          case 31: mascaraSubrede = '255.255.255.254'; break;
          case 32: mascaraSubrede = '255.255.255.255'; break;
          default: mascaraSubrede = 'Máscara inválida'; break;
      }      

      const primeiroOcteto = partesIp[0];
      let classeIp = '';
      if (primeiroOcteto >= 1 && primeiroOcteto <= 126) {
          classeIp = 'Classe A';
      } else if (primeiroOcteto >= 128 && primeiroOcteto <= 191) {
          classeIp = 'Classe B';
      } else if (primeiroOcteto >= 192 && primeiroOcteto <= 223) {
          classeIp = 'Classe C';
      } else {
          classeIp = 'Desconhecida';
      }

      let tipoIp = 'Público';
      if (
          (primeiroOcteto === 10) ||
          (primeiroOcteto === 172 && partesIp[1] >= 16 && partesIp[1] <= 31) ||
          (primeiroOcteto === 192 && partesIp[1] === 168)
      ) {
          tipoIp = 'Privado';
      }

      const partesMascara = mascaraSubrede.split('.').map(Number);
      const partesRede = partesIp.map((parte, i) => parte & partesMascara[i]);
      const enderecoRede = partesRede.join('.');

      //A operação ~partesMascara[i] & 255 inverte os bits da máscara de sub-rede (operações NOT) e, em seguida, faz uma operação "AND" com 255 para garantir que apenas os últimos 8 bits sejam considerados (já que cada octeto tem 8 bits).

      const partesBroadcast = partesRede.map((parte, i) => parte | (~partesMascara[i] & 255));
      const enderecoBroadcast = partesBroadcast.join('.');

      // ... Cria Cópia de um array

      const primeiroHost = [...partesRede];
      const ultimoHost = [...partesBroadcast];
      if (cidrEscolhido < 31) {
          primeiroHost[3] += 1;
          ultimoHost[3] -= 1;
      }
      const intervaloHosts = `${primeiroHost.join('.')} - ${ultimoHost.join('.')}`;

      const numeroHosts = Math.pow(2, 32 - cidrEscolhido) - 2;

      listaResultados.innerHTML = `
          <li>Endereço IP: ${ipDigitado}</li>
          <li>Máscara de Sub-Rede: ${mascaraSubrede}</li>
          <li>CIDR: /${cidrEscolhido}</li>
          <li>Classe de IPs: ${classeIp}</li>
          <li>Tipo: ${tipoIp}</li>
          <li>Nº de Hosts / Sub-Rede: ${numeroHosts}</li>
          <hr class="dropdown-divider">
          <li>Endereço da Rede: ${enderecoRede}</li>
          <li>Intervalo de Hosts: ${intervaloHosts}</li>
          <li>Broadcast: ${enderecoBroadcast}</li>
      `;
  });
});
