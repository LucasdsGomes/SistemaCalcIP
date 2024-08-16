
document.addEventListener('DOMContentLoaded', () => {

    const ipInput = document.getElementById('ipInput');
    const botaoVerificar = document.getElementById('botaoVerificar');


    botaoVerificar.addEventListener('click', () => {
    
        const ip = ipInput.value.trim();

    
        if (!isValidIP(ip)) {
            alert('Por favor, insira um endereço IP válido.');
            return;
        }

    
        const { ipClass, networkAddress, hostRange, broadcastAddress, numHosts } = calculateIPDetails(ip);

    
        updateUI(ip, ipClass, networkAddress, hostRange, broadcastAddress, numHosts);
    });
});

function isValidIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}

function calculateIPDetails(ip) {
    const ipClass = getClass(ip);


    const masks = {
        'Classe A': '255.0.0.0',
        'Classe B': '255.255.0.0',
        'Classe C': '255.255.255.0'
    };

    const mask = masks[ipClass] || '255.255.255.0';


    const ipBinary = ipToBinary(ip);
    const maskBinary = ipToBinary(mask);


    const networkBinary = ipBinary.split('').map((bit, index) => bit === '1' && maskBinary[index] === '1' ? '1' : '0').join('');
    const networkAddress = binaryToIp(networkBinary);


    const broadcastBinary = networkBinary.split('').map((bit, index) => maskBinary[index] === '0' ? '1' : bit).join('');
    const broadcastAddress = binaryToIp(broadcastBinary);


    const hostStartBinary = networkBinary.split('').map((bit, index) => maskBinary[index] === '0' ? '1' : bit).join('');
    const hostEndBinary = broadcastBinary.split('').map((bit, index) => maskBinary[index] === '0' ? '0' : bit).join('');
    const hostStart = binaryToIp(hostStartBinary);
    const hostEnd = binaryToIp(hostEndBinary);


    const numBitsForHosts = maskBinary.split('').filter(bit => bit === '0').length;
    const numHosts = Math.pow(2, numBitsForHosts) - 2;

    return {
        ipClass,
        networkAddress,
        hostRange: `${hostStart} - ${hostEnd}`,
        broadcastAddress,
        numHosts
    };
}

function getClass(ip) {
    const firstOctet = parseInt(ip.split('.')[0]);
    if (firstOctet >= 1 && firstOctet <= 126) return 'Classe A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'Classe B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'Classe C';
    return 'Desconhecida';
}

function ipToBinary(ip) {
    return ip.split('.').map(octet => ('00000000' + parseInt(octet).toString(2)).slice(-8)).join('');
}

function binaryToIp(binary) {
    return binary.match(/.{8}/g).map(byte => parseInt(byte, 2)).join('.');
}

function updateUI(ip, ipClass, networkAddress, hostRange, broadcastAddress, numHosts) {

    document.getElementById('ipAddress').textContent = `Endereço IP: ${ip}`;
    document.getElementById('ipClass').textContent = `Classe de IPs: ${ipClass}`;
    document.getElementById('networkAddress').textContent = `Endereço da Rede: ${networkAddress}`;
    document.getElementById('hostRange').textContent = `Intervalo de Hosts: ${hostRange}`;
    document.getElementById('broadcastAddress').textContent = `Broadcast: ${broadcastAddress}`;
    document.getElementById('numHosts').textContent = `Nº de Hosts / Sub-Rede: ${numHosts}`;
}

